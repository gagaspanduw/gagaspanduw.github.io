import { Component } from "react";
import image from "../img/image";

class Skills extends Component {
    constructor(){
        super()
        this.state = {
            skills: [
                {label: "Javascript", img:image.javascriptlogo},
                {label: "HTML", img:image.html5logo},
                {label: "CSS", img:image.css3logo},
                {label: "PHP", img:image.phplogo},
                {label: "Flutter", img:image.flutterlogo},
                {label: "Java", img:image.javalogo},
                {label: "Python", img:image.pythonlogo},
                {label: "Bootstrap", img:image.bootstraplogo},
                {label: "TailwindCSS", img:image.tailwindcsslogo},
                {label: "Selenium", img:image.seleniumlogo},
                {label: "Cypress", img:image.cypresslogo},
                {label: "WebDriverIO", img:image.webdriveriologo},
                {label: "Flutter Integration Test", img:image.flutterlogo},
                {label: "Flutter Gherkin", img:image.flutterlogo},
                {label: "Postman", img:image.postmantlogo},
                {label: "Cucumber", img:image.cucumberlogo},
            ]
        }
    }
    render(){
        return(        <div className="bg-gray-600 pr-5 pl-5 lg:pl-32 lg:pr-32">
        <h3 className="justify-center p-10 text-3xl font-bold text-center">Skills &amp; Technologies</h3>
            <div className="flex flex-auto flex-wrap justify-center">
                {this.state.skills.map( skill => (
                    <div className="justify-center text-center text-sm p-5">
                        <img width="100" height="100" className="bg-gray-200 rounded p-3" src={skill.img}></img>
                        <p className="w-24">{skill.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
    }
}
export default Skills