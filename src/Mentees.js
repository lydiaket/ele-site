import React from 'react';

function Mentees() {
    return (
        <div className="mentees-page">
            <h1>Become a Mentee</h1>
            
            <section className="mentees-intro">
                <p>
                    The ELE Mentorship program provides Ethiopian and Eritrean high school students in grades 9-12 with academic enrichment and resources to succeed in high school and beyond. This program offers tutoring, mentoring, ACT/SAT preparation, and academic and career guidance free-of-charge to assist students and guide them toward college.
                </p>
            </section>

            <section className="mentee-details">
                <h2>Program Details</h2>
                <p>
                    Our program serves Ethiopian and Eritrean high school students from grade nine through twelfth grade. We do not prioritize by location: although we are headquartered in Maryland, we accept students from all over the United States. We prioritize first-generation Ethiopian and Eritrean students from low-income communities and those who are attending schools that do not have college preparatory programs. Our students will officially "graduate" from the program after completing the first semester of college, after which they may join the program as mentors.
                </p>
            </section>

            <section className="mentee-eligibility">
                <h2>Eligibility</h2>
                <ul>
                    <li>Are an Ethiopian or Eritrean immigrant or child of an immigrant attending high school (9th - 12th grade) across the United States.</li>
                    <li>Have plans to attend college after high school.</li>
                    <li>Willingness to commit to the program for a minimum of one academic year or commitment throughout your high school experience.</li>
                    <li>Willingness to meet with a mentor at least twice per month (via email, video call, or phone).</li>
                    <li>Ability to attend monthly workshops or summer weekly college prep workshops.</li>
                    <li>Willingness to frequently update the program coordinator (Amanuel) on progress and communication with your mentor to stay on track and help improve the organization.</li>
                </ul>
                <p>
                    This application is designed to help us get to know you better so we can provide the best possible support.
                </p>
                <div className="apply-button-container">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeE52I7o3py-d3zgVExDnzwRQP_BcGTHFLyLdKvw1qozHWg2w/viewform" target="_blank" rel="noopener noreferrer" className="apply-button">
                    Click Here to Apply
                </a>
            </div>
            </section>

            <section className="mentee-questions">
                <h2>Questions?</h2>
                <p>
                    Reach out to <a href="https://www.instagram.com/ELE_Mentors" target="_blank" rel="noopener noreferrer">@ELE_Mentors</a> on Instagram or email us at <a href="mailto:Egnaleegnamentors@gmail.com">Egnaleegnamentors@gmail.com</a>!
                </p>
               
            </section>

            
        </div>
    );
}

export default Mentees;
