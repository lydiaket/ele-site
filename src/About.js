import React from 'react';
import { useState } from 'react';

const boardMembers = [
    {
        name: 'Hibist',
        image: 'hibist.png', // Replace with actual image path
        title: "Hope College - Nursing",
        quote: "I'm excited about this program because I know first-hand the stumbling blocks and barriers to college education faced by our community...",
    },
    {
        name: 'Amenti',
        image: 'amenti.png', // Replace with actual image path
        title: "American University '20 - Health Promotion",
        quote: "I love helping people in any way I can. I have a strong passion for holistic health and wellness. I aspire to become a Health Coach...",
    },
    {
        name: 'Hibist',
        image: 'hibist.png', // Replace with actual image path
        title: "Hope College - Nursing",
        quote: "I'm excited about this program because I know first-hand the stumbling blocks and barriers to college education faced by our community...",
    },
    {
        name: 'Amenti',
        image: 'amenti.png', // Replace with actual image path
        title: "American University '20 - Health Promotion",
        quote: "I love helping people in any way I can. I have a strong passion for holistic health and wellness. I aspire to become a Health Coach...",
    },
    
    // Add 8 more placeholders
];

// eslint-disable-next-line no-unused-vars
function MeetTheBoard() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => setCurrentIndex((currentIndex + 1) % boardMembers.length);
    const prev = () => setCurrentIndex((currentIndex - 1 + boardMembers.length) % boardMembers.length);

    const member = boardMembers[currentIndex];

    return (
        <section className="meet-the-board-section">
            <h2>Meet the Board</h2>
            <div className="board-slide">
                <div className="board-left">
                    <img src={member.image} alt={member.name} className="board-photo" />
                    <div className="board-info">
                        <h3>{member.name}</h3>
                        <p className="board-title">{member.title}</p>
                    </div>
                </div>
                <div className="board-right">
                    <p className="board-quote">&quot;{member.quote}&quot;</p>
                </div>
            </div>

            <div className="board-navigation">
                <button className="nav-button" onClick={prev}>‹</button>
                <div className="dots">
                    {boardMembers.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
                <button className="nav-button" onClick={next}>›</button>
            </div>
        </section>
    );
}

function About() {
    
    return (
        <div className="about-page">

            <section className="story-section">
                <h2>Our Story</h2>
                <p>
                    Egna Le Egna was founded in the summer of 2020 by college students who decided to use some of their quarantine free time to provide mentorship to first-generation high school students in the Ethiopian and Eritrean communities within the United States as they prepared for another year of virtual education. Each of us had at some point or another had the idea of starting this program ever since we graduated high school - we were all eager to pay it forward! - and we could not be happier to jump in to create Egna Le Egna to help students in 2020 and move forward. It began with our separate but similar efforts over the years to provide one-on-one mentorship to high school juniors and seniors who came to us through family, friends, church, clubs, etc. Now, Egna Le Egna is the product of our unified efforts.
                </p>
            </section>


            <section className="story-section">
                <h2>Our Mission</h2>
                <p>
                Studies show that, on average, a high school
counselor is responsible for over 400 students. Yes, that&apos;s
 right: a ratio of 482:1. We know this reality not
just because of papers we have read about, but
because we have
passed through public high schools in which students
have to fight to get the attention of a college
counselor who is simply dealing with too many
students at any given moment. In a system like this,
some students will inevitably receive more help and
attention than others. This is even worse for
immigrants. With parents who are not familiar with
the system, first-generation students have even less
access to resources and support in navigating the
college application process. As students who went
through this process ourselves, we understand how
difficult it can be to try to navigate the process amid
all the stress of daily life. 
                </p>

            </section>

            <section className="service-section">
                <h2>Our Services</h2>
                
                <h3>9th Grade</h3>
                <p>
                    Our program for high school freshmen consists of guidance on course selection, extracurricular activities, and study habits. Students will work with their mentors and counselors to create a four-year plan to ensure they are on track to graduate on time and are taking challenging and realistic course loads. They are more than welcome to attend workshops geared towards other grades, especially those focusing on volunteering and internship opportunities. By the end of their freshman year, our students should have explored their interests, identified summer programs, created a four-year plan, and developed effective study habits.
                </p>

                <h3>10th Grade</h3>
                <p>
                    Our program for high school sophomores focuses on building effective habits and developing self-confidence. Students will learn about goal setting, building study habits, and developing a growth mindset. By the end of the year, students should have understood the importance of healthy habits, goal setting, and mindset, participated in extracurriculars, accumulated community service hours, planned for the year ahead, and applied to summer opportunities.
                </p>

                <h3>11th Grade</h3>
                <p>
                    Our program for high school juniors is primarily focused on PSAT/SAT prep. They will start by taking a baseline practice SAT/ACT test at the start of the year and work with their mentors to create individualized study plans. Juniors will also begin developing a plan for their senior year and college application, including resume development, gaining leadership roles in extracurriculars, attending college fairs, and creating a list of potential colleges.
                </p>

                <h3>12th Grade</h3>
                <p>
                    Our program for high school seniors is the focus of many late summer/fall workshops. Mentors will meet with the seniors more often to create personalized schedules based on application and scholarship deadlines. Workshops will cover the college application process, financial aid, personal statements, and college tours. Upon graduation, we begin preparing our students for their transition to college with workshops on topics like imposter syndrome, time management, and budgeting.
                </p>
            </section>

            {/* <MeetTheBoard /> */}


        </div>
    );
}

export default About;
