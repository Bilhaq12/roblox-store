-- Database Schema untuk Roblox Store
-- Jalankan script ini di Supabase SQL Editor

-- 1. Buat ENUM types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('pending', 'processing', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_method AS ENUM ('qris', 'bank_transfer', 'e_wallet');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE product_category AS ENUM ('robux_login', 'robux_gamepass', 'limited_items', 'game_passes', 'joki_services');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Buat tabel products
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category product_category NOT NULL,
    image_url TEXT,
    stock INTEGER DEFAULT 0,
    delivery_time VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Buat tabel user_profiles (tanpa foreign key dulu)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY,
    full_name TEXT NOT NULL,
    role user_role DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Buat tabel orders
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status order_status DEFAULT 'pending',
    payment_status payment_status DEFAULT 'pending',
    payment_method payment_method DEFAULT 'qris',
    customer_name VARCHAR(255),
    customer_whatsapp VARCHAR(20),
    customer_nick VARCHAR(100),
    customer_password VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Buat tabel order_items
CREATE TABLE IF NOT EXISTS order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Buat tabel wishlist
CREATE TABLE IF NOT EXISTS wishlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- 7. Buat tabel chat_sessions
CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Buat tabel chat_messages
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    message TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Buat indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);

-- 10. Buat function untuk generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.order_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(CAST(nextval('order_number_seq') AS TEXT), 4, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 11. Buat sequence untuk order number
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- 12. Buat trigger untuk order number
DROP TRIGGER IF EXISTS trigger_generate_order_number ON orders;
CREATE TRIGGER trigger_generate_order_number
    BEFORE INSERT ON orders
    FOR EACH ROW
    EXECUTE FUNCTION generate_order_number();

-- 13. Buat function untuk handle new user (tanpa foreign key)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, full_name, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        COALESCE(NEW.raw_user_meta_data->>'role', 'user')::user_role
    );
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Jika gagal, tidak apa-apa - user profile bisa dibuat manual
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 14. Buat trigger untuk new user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 15. Setup RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- 16. Buat RLS policies
-- Products: semua orang bisa lihat
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (true);

-- User profiles: user bisa lihat dan update sendiri
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Orders: user bisa lihat dan buat sendiri
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items: user bisa lihat order items dari order mereka
CREATE POLICY "Users can view own order items" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own order items" ON order_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

-- Wishlist: user bisa lihat dan manage sendiri
CREATE POLICY "Users can view own wishlist" ON wishlist
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own wishlist" ON wishlist
    FOR ALL USING (auth.uid() = user_id);

-- Chat sessions: user bisa lihat dan buat sendiri
CREATE POLICY "Users can view own chat sessions" ON chat_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat sessions" ON chat_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Chat messages: user bisa lihat dan kirim di session mereka
CREATE POLICY "Users can view own chat messages" ON chat_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM chat_sessions 
            WHERE chat_sessions.id = chat_messages.session_id 
            AND chat_sessions.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own chat messages" ON chat_messages
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM chat_sessions 
            WHERE chat_sessions.id = chat_messages.session_id 
            AND chat_sessions.user_id = auth.uid()
        )
    );

-- 17. Insert sample products
INSERT INTO products (name, description, price, category, image_url, stock, delivery_time) VALUES
('Robux 100 via Login', 'Robux 100 dengan metode login akun', 15000.00, 'robux_login', '/images/robux-100.jpg', 100, '5-10 menit'),
('Robux 500 via Login', 'Robux 500 dengan metode login akun', 75000.00, 'robux_login', '/images/robux-500.jpg', 50, '5-10 menit'),
('Robux 1000 via Login', 'Robux 1000 dengan metode login akun', 150000.00, 'robux_login', '/images/robux-1000.jpg', 25, '5-10 menit'),
('Robux 100 Gamepass', 'Robux 100 via Gamepass (delay 5 hari)', 12000.00, 'robux_gamepass', '/images/robux-100-gp.jpg', 200, '5 hari'),
('Robux 500 Gamepass', 'Robux 500 via Gamepass (delay 5 hari)', 60000.00, 'robux_gamepass', '/images/robux-500-gp.jpg', 100, '5 hari'),
('Robux 1000 Gamepass', 'Robux 1000 via Gamepass (delay 5 hari)', 120000.00, 'robux_gamepass', '/images/robux-1000-gp.jpg', 50, '5 hari'),
('Limited Item: Korblox Deathspeaker', 'Limited item Korblox Deathspeaker', 500000.00, 'limited_items', '/images/korblox.jpg', 5, '1-2 jam'),
('Limited Item: Sparkle Time Fedora', 'Limited item Sparkle Time Fedora', 300000.00, 'limited_items', '/images/fedora.jpg', 10, '1-2 jam'),
('Game Pass: VIP Access', 'Game pass untuk akses VIP', 25000.00, 'game_passes', '/images/vip-pass.jpg', 50, '10-15 menit'),
('Game Pass: Premium Features', 'Game pass untuk fitur premium', 50000.00, 'game_passes', '/images/premium-pass.jpg', 30, '10-15 menit'),
('Joki Level 1-50', 'Joki leveling dari level 1 ke 50', 100000.00, 'joki_services', '/images/joki-1-50.jpg', 20, '1-2 hari'),
('Joki Level 1-100', 'Joki leveling dari level 1 ke 100', 200000.00, 'joki_services', '/images/joki-1-100.jpg', 10, '2-3 hari')
ON CONFLICT DO NOTHING;

-- 18. Cek hasil
SELECT 'Database setup completed successfully!' as status;
SELECT COUNT(*) as products_count FROM products;
SELECT COUNT(*) as user_profiles_count FROM user_profiles; 