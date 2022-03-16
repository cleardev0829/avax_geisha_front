import React, {useEffect, useState} from "react";

import {useWallet} from "../../core/context-provider/wallet/wallet-context";
import cn from "classnames";
import {checkDataBase, clearMinted, createCollections} from "../../core/utils/network/geisha";
import {toast} from "../../core/utils/notification.util";
import BarLoader from "react-spinners/BounceLoader";
import {Redirect} from "react-router-dom";
import {ROUTES} from "../../core/data/routes";

const Dashboard = (props: any) => {
    const { setPageIndex, token } = useWallet();
    const [visible, setVisible] = useState(false);
    const { isOwner } = useWallet();

    useEffect(() => {
        if(!isOwner) {
            setPageIndex(0);
        }
        setPageIndex(6);
    },[]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        {
            isOwner ? (
                <div>
                    {
                        visible ? (
                            <BarLoader size={ 70 } color='white' />
                        ) : (
                            <div>
                                <div>
                                    <button
                                        className={cn("styles.button", "btn", "btn-block", 'btn-lg', 'btn-outline-danger' ,"mt-10")}
                                        onClick={() => {
                                            setVisible(true);
                                            createCollections(token).then((result) => {
                                                console.log(result);
                                                if(result.statusCode === 404) {
                                                    setVisible(false);
                                                    toast('danger', `Failed.`);
                                                } else {
                                                    setVisible(false);
                                                    toast('success', `${result} collections are created.`);
                                                }
                                            });
                                        }}
                                    >
                                        Create Collections
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className={cn("styles.button", "btn", "btn-block", 'btn-lg', 'btn-outline-danger' ,"mt-10")}
                                        onClick={() => {
                                            setVisible(true);
                                            clearMinted(token).then((result) => {
                                                setVisible(false);
                                                toast('success', `All minted items were cleared.`);
                                            });
                                        }}
                                    >
                                        Clear Minted
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className={cn("styles.button", "btn", "btn-block", 'btn-lg', 'btn-outline-danger' ,"mt-10")}
                                        onClick={() => {
                                            setVisible(true);
                                            checkDataBase(token).then((result) => {
                                                setVisible(false);
                                                toast('success', `${result} Checked.`);
                                            });
                                        }}
                                    >
                                        Check DataBase
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
            ) : (
                <Redirect exact from="/" to={ ROUTES.home }/>
            )
        }
    </div>
  );
};

export default Dashboard;
