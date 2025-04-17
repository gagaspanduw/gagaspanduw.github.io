import { Component } from "react";
import image from "../img/image";

class Skills extends Component {
    constructor(){
        super()
        this.state = {
            skillCategories: [
                {
                    name: "Programming Languages",
                    skills: [
                        {label: "JavaScript", img: image.javascriptlogo},
                        {label: "HTML", img: image.html5logo},
                        {label: "CSS", img: image.css3logo},
                        {label: "PHP", img: image.phplogo},
                        {label: "Java", img: image.javalogo},
                        {label: "Python", img: image.pythonlogo},
                    ]
                },
                {
                    name: "Frameworks & Libraries",
                    skills: [
                        {label: "Flutter", img: image.flutterlogo},
                        {label: "Bootstrap", img: image.bootstraplogo},
                        {label: "TailwindCSS", img: image.tailwindcsslogo},
                    ]
                },
                {
                    name: "Testing Tools",
                    skills: [
                        {label: "Selenium", img: image.seleniumlogo},
                        {label: "Cypress", img: image.cypresslogo},
                        {label: "WebDriverIO", img: image.webdriveriologo},
                        {label: "Flutter Tests", img: image.flutterlogo},
                        {label: "Cucumber", img: image.cucumberlogo},
                        {label: "Postman", img: image.postmantlogo},
                        {label: "Appium", img: "https://www.pinclipart.com/picdir/big/567-5676022_appium-perfecto-appium-logo-clipart.png"},
                    ]
                }
            ]
        }
    }

    render(){
        return(
            <section id="skills" className="bg-gray-900 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-red-400 mb-12">Skills &amp; Technologies</h2>
                    
                    {this.state.skillCategories.map((category, index) => (
                        <div key={index} className="mb-14">
                            <h3 className="text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-2">{category.name}</h3>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                {category.skills.map((skill, skillIndex) => (
                                    <div 
                                        key={skillIndex} 
                                        className="flex flex-col items-center bg-gray-800 rounded-xl shadow-lg p-5 hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300 hover:bg-gray-750"
                                    >
                                        <div className="w-16 h-16 bg-white bg-opacity-10 rounded-full p-3 mb-3 flex items-center justify-center">
                                            <img 
                                                className="max-h-10" 
                                                src={skill.img} 
                                                alt={skill.label} 
                                            />
                                        </div>
                                        <p className="text-center text-gray-200 font-medium">{skill.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    
                    <div className="text-center mt-10">
                        <p className="text-gray-400">
                            I'm continuously learning and expanding my skill set to stay current with industry trends.
                        </p>
                    </div>
                </div>
            </section>
        )
    }
}

export default Skills