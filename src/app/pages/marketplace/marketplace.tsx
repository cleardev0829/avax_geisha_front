import React, {useEffect, useState} from "react";
import cn from "classnames";
import { backgrounds, bodies, faces, hairs, accessories, auras } from "../../../app/core/data/basic-images";
import Pagination from '@material-ui/lab/Pagination';

import Icon from "../../layout/Icon";
import MarketCard from "../../component/market-card/market-card";
import {useOverlay} from "../../core/context-provider/loading-overlay/loading-overlay-context";
import {Geisha} from "../../core/models/geisha";
import {getMarketPlaceItems} from "../../core/utils/network/catalog";
import {useWallet} from "../../core/context-provider/wallet/wallet-context";
import {Filter} from "../../core/models/filter";
import Dropdown from "../../component/dropdown/dropdown";

import styles from "./Search01.module.sass";
import "./catalog-page.scss";
import {getFloorPrice, getTradingVolume} from "../../core/utils/network/geisha";

export const countOnDisplay: number = 12;

const Marketplace = () => {
  return (
    <div className={cn("min-vh-100")} style={{ paddingTop: '40px', paddingBottom: '100px' }}>
      <div className={cn("container")}>
        <div className={styles.row}>
            <div className={styles.wrapper}>
                <div className="d-flex justify-content-center">
                    <div className="d-flex align-items-center text-center p-5">
                        <h2 className="d-flex align-items-center">Under Construction</h2>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;