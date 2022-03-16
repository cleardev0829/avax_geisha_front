import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import { useWallet } from "../../core/context-provider/wallet/wallet-context";
import Hero from "./hero/hero";
import Mint from "./mint/mint";
import Roadmap from "./roadmap/roadmap";
import Team from "./team/team";
import About from "./about/about";
import FAQ from "./faq/faq";

const Home = (props: any) => {
    const { pageIndex, setPageIndex } = useWallet();
    const { location } = props;
    useEffect(() => {
        if(pageIndex === 5 || pageIndex === 6) {
            return;
        }
        if(location.hash === '#about') {
            setPageIndex(2);
        } else if(location.hash === '#mint') {
            setPageIndex(3);
        } else if(location.hash === '#roadmap') {
            setPageIndex(4);
        } else if(location.hash === '#team') {
            setPageIndex(5);
        }
    },[]);

    useEffect(() => {
        window.location.hash = window.decodeURIComponent(window.location.hash);
        const scrollToAnchor = () => {
            const hashParts = window.location.hash.split('#');
            if (hashParts.length > 1) {
                const hash = hashParts[1].slice(0);
                const query = document.querySelector(`#${hash}`);
                if(query) {
                    query.scrollIntoView();
                }
            }
        };
        scrollToAnchor();
        window.onhashchange = scrollToAnchor;
    },[window.location.hash])

  return (
    <div>
        <Helmet>
            <script src="./js/script.js?ver=145" type="text/javascript"></script>
        </Helmet>
        <Hero />
        <About />
        <Mint />
        <Roadmap />
        <Team />
        <FAQ />
    </div>
  );
};

export default Home;
