import React from "react";
import cn from "classnames";

import styles from "./About.module.sass";
import "./about.css";

const About = () => {

  return (
    <div className={cn(styles.welcomeSection)} id="about">
        <div className="container">
            <div className="d-flex flex-column align-items-center justify-content-center">
                <div>
                    <h1 className="after1 mt-10 text-center">AVAX GEISHA</h1>
                    <div className="my-20 about-us-text">
                        <p className="">
                            There is an ancient order of Geisha in the Meta universe called the Avax Geisha’s or the order of 10,000 Sisters. Among the members of the order, there are only the most beautiful and skilled Geishas, whose artistry has reached unbelievable heights of perfection and brought their skills to the extreme.
                        </p>
                        <p>
                            "Avax Geisha" is an NFT of high art which has a completely different, more beautiful view of the world. As a member of the Meta universe, it is their goal to bring calmness, self-confidence, good luck, and happiness to others. Avax Geisha’s are known and praised for their ability to help people make the right decisions which will lead to success, good luck and happiness. They are like Sakura’s blooming in the spring, enchanting and bewitching the entire world with their beauty. The fabulous art is what makes Avax Geisha’s so popular and why every fan of the Meta universe craves to own one.
                        </p>
                        <p>
                            Besides having a unique appearance, makeup, kimono with a pattern unique to each Geisha, handmade jewellery and accessories, the Avax Geisha is expected to have a magical and appealing aura. In the end, the Geisha will completely turn into a unique object of art and elusive beauty.
                        </p>
                        <p>
                            Avax Geisha’s are a unique NFT collection of 10,000 randomly generated 3D NFTs. Avax Geisha's residence is the Avalanche blockchain. There are 121M+ possible variations of backgrounds, body, faces, hairstyles, accessories and environmental elements. A total of 127 handcrafted elements which were created with love and attention to detail.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default About;
