import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Home() {
    return (
        <div className="home">
            <section className="intro-section">
                <div className="intro-text">
                    <h1>ሰላም</h1>
                    <h2>Welcome to ELE Mentorship!</h2>
                    <p>
                        Our program aims to support and empower Ethiopian and Eritrean high school students through personalized mentorship and comprehensive resources that will enhance their personal growth and academic success.
                    </p>
                    <Link to="/about">
                        <button className="learn-more-button">Learn More</button>
                    </Link>
                </div>
                <div className="intro-image">
                    <img src="zoom.png" alt="Illustration" />
                    
                </div>
            </section>

            <section className="features-section">
                <div className="feature-card1">
                    <img src="handshake.png" alt="One-on-One Mentorship" className="feature-icon" />
                    <h3>One-on-One Mentorship</h3>
                
                    <p>
                        <br></br>ELE mentors are dedicated to creating meaningful, supportive relationships with mentees, guiding them through their high school journey. Mentors act as a trusted friend and role model, helping students set goals, build confidence, and navigate the challenges of school and life.
                    </p>
                </div>
                <div className="feature-card2">
                    <img src="grade.png" alt="Academic Support" className="feature-icon" />
                    <h3>Academic Support</h3>
                    <p>
                    <br></br>Our program provides tailored academic support to help students excel in their coursework. Through personalized tutoring, study habit workshops, and goal-setting sessions, we equip students with the tools they need to thrive in high school and beyond.
                    </p>
                </div>
                <div className="feature-card3">
                    <img src="grad.png" alt="College Applications" className="feature-icon" />
                    <h3>College Applications</h3>
                    <p>
                    <br></br>We demystify the college application process by offering workshops on everything from crafting personal statements to creating balanced college lists. Our mentors provide one-on-one guidance to ensure students are prepared for every step, from FAFSA applications to interview prep.
                    </p>
                </div>
            </section>

            <section className="testimonials-section">
                <h2>Student Testimonials</h2>

                <div className="testimonial-card">
                    <img src="besu.png" alt="Besu" className="testimonial-image" />
                    <div className="testimonial-content">
                        <p>
                            &quot;The ELE program has connected me with a set of amazing and talented Ethiopian students who look forward to seeing other Ethiopians achieve their fullest potential. Thank you to ELE for helping me make my vision into a reality; I look forward to being a mentor and helping out others as well.&quot;
                        </p>
                        <h4>Besufekad</h4>
                        <h3>Harvard College &apos;28</h3>
                    </div>
                </div>

                <div className="testimonial-card">
                    <img src="arsema.png" alt="Arsema" className="testimonial-image" />
                    <div className="testimonial-content">
                        <p>
                            I am incredibly grateful for the guidance and support I received from ELE throughout my college application journey. Having someone to guide me through the intricate process was invaluable. As a first-generation student, being part of a community that understood and supported my unique circumstances made the college process significantly easier. I highly recommend ELE to any student in need of guidance and a supportive community during their college application journey.
                        </p>
                        <h4>Arsema</h4>
                        <h3>University of Maryland, Baltimore County &apos;27</h3>
                    </div>
                </div>

                <div className="testimonial-card">
                    <img src="lily.png" alt="Lily" className="testimonial-image" />
                    <div className="testimonial-content">
                        <p>
                            &quot;The ELE mentors are a supportive group of individuals who offer guidance and reassurance. They take the time to understand your unique aspirations and needs, and then foster a sense of companionship by conducting Zoom sessions on topics such as selecting the right college, visiting college campuses, crafting compelling resumes, writing impactful college essays, financial aid, and applying for scholarships. They even offer essay revision sessions in order to help you showcase your personality in your essays. You can reach out to them via phone or text whenever you need assistance. Thanks to these amazing mentors, I never felt overwhelmed during the college application process.&quot;
                        </p>
                        <h4>Lily</h4>
                        <h3>University of Maryland, College Park &apos;27</h3>
                    </div>
                </div>

            </section>
        </div>
    );
}

export default Home;
