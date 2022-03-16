import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import 'animate.css';

import User from "./user/user";
import {useWallet} from "../../core/context-provider/wallet/wallet-context";
import {getLocalStorageWalletAddress, setLocalStorageWalletStatus} from "../../core/utils/wallet";
import {isEthNetwork, switchNetwork} from "../../core/utils/network/user";
import CollapseCloseIcon from "../icon/collapse-close-icon";
import CollapseOpenIcon from "../icon/collapse-open-icon";

import styles from "./Header.module.sass";

const config = [
  {
    url: "/home#about",
    title: "About",
  },
  {
    url: "/home#mint",
    title: "Mint",
  },
  {
    url: "/my-geishas",
    title: "My Geishas",
  },
  {
    url: "/market-place",
    title: "Marketplace",
  },
  {
    url: "/home#roadmap",
    title: "Roadmap",
  },
  {
    url: "/home#team",
    title: "Team",
  },
  {
    url: "/home#faq",
    title: "Faq",
  },
];

const dashBoardLink = { url: "/dashboard", title: "Dashboard" };

const Headers = () => {

  const [visibleNav, setVisibleNav] = useState(false);
  const { isOwner, provider, setWalletAddress, connectWallet, pageIndex, setPageIndex, setProvider } = useWallet();
  const [blocked, setBlocked] = useState(true);

  if(window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts: any[]) => {
      if(accounts.length === 0) {
        setProvider(null);
        setWalletAddress('');
        setLocalStorageWalletStatus('').then();
      }
      if(accounts.length > 0) {
        isEthNetwork().then((result) => {
          if(!result) {
            setWalletAddress('');
            switchNetwork().then();
          }
        })
      }
    });
  } else {
  }

  useEffect(() => {
    let isSubscribed = true;
    if(!isSubscribed) { return; }
    loadWallet().then();
    switchNetwork().then();
    return () => {
      isSubscribed = false;
    };
  },[window.ethereum])

  useEffect(() => {
    window.addEventListener("scroll", (e) => scrollEvent(e));
    return () => { // return a cleanup function to unregister our function since its gonna run multiple times
      window.removeEventListener("scroll", (e) => scrollEvent(e));
    };
  }, []);

  const scrollEvent = (e: Event) => {
    const query = document.getElementById('header');
    if(query) {
      const posY = query.getBoundingClientRect().y;
      if(posY < window.scrollY) {
        setBlocked(false);
      } else {
        setBlocked(true);
      }
    }
  }

  const loadWallet = async () => {
    if (!await isEthNetwork()) {
      setWalletAddress('');
      return;
    }
    if(getLocalStorageWalletAddress() !== '') {
      connectWallet();
    }
  }

  return (
    <header className={cn(styles.header, !blocked ? styles.blocked : '', "d-flex", "align-items-center")} id="header">
      <button
          className="d-lg-none z-index-100"
          onClick={() => setVisibleNav(!visibleNav)}
      >
        {
          visibleNav ? (
              <CollapseCloseIcon/>
          ) : (
              <CollapseOpenIcon/>
          )
        }
      </button>
      <div className={cn("container", styles.container)}>
        <Link className={styles.logo} to="/">
            <img src="/logo2.png" alt=""/>
        </Link>
        <div className={cn(styles.wrapper, { [styles.active]: visibleNav })} style={{ height: 'auto' }}>
          <nav className={cn(styles.nav)}>
            {
              config.map((item, index) => (
                  <Link
                      className={cn(styles.link, {
                        [styles.active]: index === pageIndex,
                      })}
                      onClick={() => {
                        setPageIndex(index);
                        setVisibleNav(false);
                      }}
                      to={item.url}
                      key={index}
                  >
                    {item.title}
                  </Link>
              ))
            }
            {
              isOwner && (
                    <Link
                        className={cn(styles.link, {
                          [styles.active]: 6 === pageIndex,
                        })}
                        onClick={() => {
                          setPageIndex(6);
                          setVisibleNav(false);
                        }}
                        to={dashBoardLink.url}
                    >
                      {dashBoardLink.title}
                    </Link>
                )
            }
          </nav>
        </div>
        {
          provider ? (
              <User className="" />
          ) : (
              <button
                  className={cn("button-stroke button-small", styles.button)}
                  onClick={ () => connectWallet()}
              >
                Connect Wallet
              </button>
          )
        }
      </div>
    </header>
  );
};

export default Headers;
