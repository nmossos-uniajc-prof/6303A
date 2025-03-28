import { useState, useEffect } from "react";

function About() {
    const [hora, setHora] = useState(new Date().toLocaleTimeString());
    useEffect(() => {
        const timer = setInterval(() => {
          setHora(new Date().toLocaleTimeString());
        }, 1000);
        console.log("*");
        
        return () => clearInterval(timer);
      });
  return (
    <>
    <h1>About {hora}</h1>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, consequatur perferendis quod officiis error nemo porro maxime rem excepturi quasi doloremque a beatae consequuntur illum voluptates, ipsa vero aspernatur omnis.</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur reiciendis distinctio perspiciatis, dolore rem facere, beatae voluptates ducimus molestias repellendus consequuntur reprehenderit rerum, eos tempora exercitationem impedit obcaecati.    </p>
    </>
  )
}

export default About