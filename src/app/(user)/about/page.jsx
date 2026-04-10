export default function About(){
    return(
        <main className="about-container">
            <section className="about-hero">
                <div className="hero-content">
                    <h1>Aura Store</h1>
                    <p>Nâng tầm trải nghiệm công nghệ của bạn với những thiết bị di động đỉnh cao.</p>
                </div>
            </section>

            <section className="about-story">
                <div className="container">
                    <div className="story-grid">
                        <div className="story-text">
                            <h2>Câu Chuyện Của Chúng Tôi</h2>
                            <p>Được thành lập từ niềm đam mê công nghệ vô tận, Aura Store không chỉ bán điện thoại, chúng tôi mang đến những hào quang công nghệ mới nhất. Chúng tôi tin rằng mỗi chiếc điện thoại là một người bạn đồng hành, giúp bạn kết nối và khai phá tiềm năng bản thân.</p>
                            <p>Tại Aura, chất lượng và sự hài lòng của khách hàng luôn được đặt lên hàng đầu.</p>
                        </div>
                        <div className="story-stats">
                            <div className="stat-item">
                                <span className="stat-number">5+</span>
                                <span className="stat-label">Năm kinh nghiệm</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">50k+</span>
                                <span className="stat-label">Khách hàng tin dùng</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-values">
                <div className="container">
                    <h2 className="section-title">Giá Trị Cốt Lõi</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="icon">💎</div>
                            <h3>Chất Lượng</h3>
                            <p>Cam kết hàng chính hãng 100% với quy trình kiểm định nghiêm ngặt.</p>
                        </div>
                        <div className="value-card">
                            <div className="icon">🚀</div>
                            <h3>Đổi Mới</h3>
                            <p>Luôn cập nhật những mẫu flagship mới nhất từ các thương hiệu lớn.</p>
                        </div>
                        <div className="value-card">
                            <div className="icon">🛡️</div>
                            <h3>Tận Tâm</h3>
                            <p>Chế độ hậu mãi và bảo hành dài hạn, đồng hành cùng bạn trọn đời máy.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}