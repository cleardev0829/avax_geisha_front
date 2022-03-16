import React from "react";
import cn from "classnames";
import styles from "./Footer.module.sass";
import TwitterIcon from "../icon/twitter-icon";
import DiscordIcon from "../icon/discord-icon";

const Footers = () => {

  return (
      <footer className={styles.footer}>
        <div className={cn("container", styles.container)}>
          <div className={styles.foot}>
            <div className={styles.copyright}>
              Copyright © 2022 GeishaLab. All rights reserved
            </div>
            <div className="d-flex justify-content-center mt-5">
              <a className="mr-20" href="https://twitter.com/avaxgeisha">
                <TwitterIcon/>
              </a>
              <a href="https://discord.gg/nqR45srQbQ">
                <DiscordIcon/>
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footers;
