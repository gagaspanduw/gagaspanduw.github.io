import React, { Component } from 'react'
import images from '../img/image.js'
// import googlecertificate from '../img/fundamentaldigitalmarketing.jpg'
// import dicodingawscloud from '../img/cloudpractitioneressentials.jpg'

class Certificates extends Component {
    constructor(){
        super()
        this.state = {
            menu: [
                {image:'https://firebasestorage.googleapis.com/v0/b/testautomationu-9e0b6.appspot.com/o/certificates%2FTAU-28e3ed90.png?alt=media&token=471dcfe2-b075-498d-a0a9-924a68aac620', 
                courseName:'Java Programming', 
                organizationName:'Test Automation University', 
                link:'https://testautomationu.applitools.com/certificate/?id=28e3ed90'},
                {image:'https://firebasestorage.googleapis.com/v0/b/testautomationu-9e0b6.appspot.com/o/certificates%2FTAU-7d584f16.png?alt=media&token=791d659d-2ed9-4693-ba59-546163b9c778', 
                courseName:'Setting a Foundation for Successful Test Automation', 
                organizationName:'Test Automation University', 
                link:'https://testautomationu.applitools.com/certificate/?id=7d584f16'},
                {image:'https://firebasestorage.googleapis.com/v0/b/testautomationu-9e0b6.appspot.com/o/certificates%2FTAU-9d208e5e.png?alt=media&token=9cc753d4-a2b6-4ee2-be43-d2d92899964e', 
                courseName:'IntelliJ for Test Automation Engineers', 
                organizationName:'Test Automation University', 
                link:'https://testautomationu.applitools.com/certificate/?id=9d208e5e'},
                {image:images.googledigiralmarketingcertificate, 
                courseName:'Fundamental of Digital Marketing', 
                organizationName:'Google Digital Garage', 
                link:'https://learndigital.withgoogle.com/digitalgarage/validate-certificate-code'},
                {image:images.dicodingawscloud, 
                courseName:'Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)', 
                organizationName:'Dicoding', 
                link:'https://www.dicoding.com/certificates/RVZK4580EPD5'},
                {image:'https://firebasestorage.googleapis.com/v0/b/testautomationu-9e0b6.appspot.com/o/certificates%2FTAU-d115d2a4.png?alt=media&token=19219726-451f-4bf8-9643-adf2ff99bab6', 
                courseName:'Introduction to TestNG', 
                organizationName:'Test Automation University', 
                link:'https://testautomationu.applitools.com/certificate/?id=d115d2a4'},
                {image:'https://firebasestorage.googleapis.com/v0/b/testautomationu-9e0b6.appspot.com/o/certificates%2FTAU-053c7a30.png?alt=media&token=fcfb28c2-0ce2-471c-bb10-e20e0d3a8e4a', 
                courseName:'Cucumber with Java', 
                organizationName:'Test Automation University', 
                link:'https://testautomationu.applitools.com/certificate/?id=053c7a30'},
                {image:'https://firebasestorage.googleapis.com/v0/b/testautomationu-9e0b6.appspot.com/o/certificates%2FTAU-55a7c5a8.png?alt=media&token=0d0be566-8062-4769-a92e-c9127993c3cc', 
                courseName:'Continuous Integration with Jenkins', 
                organizationName:'Test Automation University', 
                link:'https://testautomationu.applitools.com/certificate/?id=55a7c5a8'},
                {image:'https://firebasestorage.googleapis.com/v0/b/testautomationu-9e0b6.appspot.com/o/certificates%2FTAU-25de5406.png?alt=media&token=bd0a5356-de78-4143-8abc-732bdb28238d', 
                courseName:'Introduction to Blockchain Testing', 
                organizationName:'Test Automation University', 
                link:'https://testautomationu.applitools.com/certificate/?id=25de5406'},
                {image:'https://firebasestorage.googleapis.com/v0/b/testautomationu-9e0b6.appspot.com/o/certificates%2FTAU-1ea0e4d9.png?alt=media&token=ab21a132-5460-4113-b69f-1721a09b4d44', 
                courseName:'Mocha Javascript Test Framework', 
                organizationName:'Test Automation University', 
                link:'https://testautomationu.applitools.com/certificate/?id=1ea0e4d9'},
                {image:'https://firebasestorage.googleapis.com/v0/b/testautomationu-9e0b6.appspot.com/o/certificates%2FTAU-0f9e5ff7.png?alt=media&token=604f9ac8-7566-4862-b4a0-77b57b04f5e3', 
                courseName:'UI Automation with WebdriverIO', 
                organizationName:'Test Automation University', 
                link:'https://testautomationu.applitools.com/certificate/?id=0f9e5ff7'},
                {image:'https://firebasestorage.googleapis.com/v0/b/testautomationu-9e0b6.appspot.com/o/certificates%2FTAU-33d882aa.png?alt=media&token=f93bbd3b-d91d-4550-a326-204f475ab387', 
                courseName:'Web Element Locator Strategies', 
                organizationName:'Test Automation University', 
                link:'https://testautomationu.applitools.com/certificate/?id=33d882aa'},
                {image:'https://firebasestorage.googleapis.com/v0/b/testautomationu-9e0b6.appspot.com/o/certificates%2FTAU-33d7f9a2.png?alt=media&token=489b8dc9-5dfb-4256-ad70-0dfb6fc46ba7', 
                courseName:'Mobile Automation with Appium in JavaScript', 
                organizationName:'Test Automation University', 
                link:'https://testautomationu.applitools.com/certificate/?id=33d7f9a2'},
                {image:'https://firebasestorage.googleapis.com/v0/b/testautomationu-9e0b6.appspot.com/o/certificates%2FTAU-9609f9f2.png?alt=media&token=45dd5655-907e-4ca9-91ce-7ed7ff750c09', 
                courseName:'Introduction to Cypress', 
                organizationName:'Test Automation University', 
                link:'https://testautomationu.applitools.com/certificate/?id=9609f9f2'},
                {image:'https://firebasestorage.googleapis.com/v0/b/testautomationu-9e0b6.appspot.com/o/certificates%2FTAU-0b38ee32.png?alt=media&token=18595139-695a-4174-862a-f25bd81a1cd0', 
                courseName:'Python Programming', 
                organizationName:'Test Automation University', 
                link:'https://testautomationu.applitools.com/certificate/?id=0b38ee32'},
                {image:'https://firebasestorage.googleapis.com/v0/b/testautomationu-9e0b6.appspot.com/o/certificates%2FTAU-5c7d51c1.png?alt=media&token=358790dd-97d1-4336-b886-541ef2127ec7', 
                courseName:'Scaling Tests with Docker', 
                organizationName:'Test Automation University', 
                link:'https://testautomationu.applitools.com/certificate/?id=5c7d51c1'},
                {image:'https://firebasestorage.googleapis.com/v0/b/testautomationu-9e0b6.appspot.com/o/certificates%2FTAU-2c48e490.png?alt=media&token=274ded7e-3e2e-4000-ae69-46e3605a3d34', 
                courseName:'Selenium WebDriver with Java', 
                organizationName:'Test Automation University', 
                link:'https://testautomationu.applitools.com/certificate/?id=2c48e490'},
                {image:'https://firebasestorage.googleapis.com/v0/b/testautomationu-9e0b6.appspot.com/o/certificates%2FTAU-7250fe04.png?alt=media&token=5269279a-ab11-41de-9990-59b5f527b4bc', 
                courseName:'API Test Automation with Postman', 
                organizationName:'Test Automation University', 
                link:'https://testautomationu.applitools.com/certificate/?id=7250fe04'},
                {image:'https://firebasestorage.googleapis.com/v0/b/testautomationu-9e0b6.appspot.com/o/certificates%2FTAU-0a02eec2.png?alt=media&token=a3477d81-5edd-498f-8c72-f46c58b9e3c0', 
                courseName:'Intellij for Test Automation Engineers', 
                organizationName:'Test Automation University', 
                link:'https://testautomationu.applitools.com/certificate/?id=0a02eec2'},
                {image:'', 
                courseName:'Coming Soon', 
                organizationName:'Coming Soon', 
                link:''}
            ]
        }
    }
    render(){
        return(
            <div className="pr-10 pl-10 lg:pr-32 lg:pl-32 text-left ">
            <h2 className="pb-10 text-3xl font-bold">CERTIFICATE</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 justify-center content-center lg:flex-row">
                    {
                            this.state.menu.map(menu => (
                                <div className="flex flex-col ">
                                <div className="p-5 flex justify-center lg:transition ease-in-out lg:duration-700 lg:transform hover:scale-150">
                                    <a target="_blank" href={menu.link}><img className="w-80 object-center object-contain" src={menu.image}></img></a>
                                </div>
                                <div className="flex-row text-center text-sm">
                                    <div>
                                        <a target="_blank" href={menu.link}>{menu.courseName}</a><br/>
                                        <a className="font-bold" target="_blank" href={menu.link}>{menu.organizationName}</a><br/>
                                    </div>
                                    <div className="grid cols-auto justify-center pt-5 pb-10">
                                        <a target="_blank" href={menu.link} className="flex flex-row text-sm">
                                        <svg width="10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>&nbsp;Check certificate</a>
                                    </div>
                                </div>
                            </div>  
                            ))
                        }
            </div>
            </div>
        )
    }
}

const Certificate = (props) => (
    <div>
        <Certificates></Certificates>
    </div>
)
export default Certificate