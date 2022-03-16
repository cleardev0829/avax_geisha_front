import React from "react";
import cn from "classnames";
import styles from "./Team.module.sass";
import "./team.css";

const Team = () => {
  return (
    <div className={cn(styles.teamSection)} id="team">
        <div className="container">
            <div className={cn(styles.card)}>
                    <h1 className="mt-10 text-center">OUR TEAM</h1>

                    <div className="team-boxed">

                            <div className="row people">
                                <div className="col-md-6 col-lg-4 item">
                                    <div className="box"><img className="rounded-circle" src="/images/geishas/1.png" alt="img" />
                                        <h3 className="name">Becky</h3>
                                        <p className="title">Project Lead</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 item">
                                    <div className="box"><img className="rounded-circle" src="/images/geishas/2.png" alt="img" />
                                        <h3 className="name">Mihoko</h3>
                                        <p className="title">Design Lead</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 item">
                                    <div className="box"><img className="rounded-circle" src="/images/geishas/3.png" alt="img" />
                                        <h3 className="name">LeGCHart</h3>
                                        <p className="title">Marketing Lead</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 item">
                                    <div className="box"><img className="rounded-circle" src="/images/geishas/18.png" alt="img" />
                                        <h3 className="name">Shinomat</h3>
                                        <p className="title">Development Lead</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 item">
                                    <div className="box"><img className="rounded-circle" src="/images/geishas/5.png" alt="img" />
                                        <h3 className="name">Fantast</h3>
                                        <p className="title">3D Designer</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 item">
                                    <div className="box"><img className="rounded-circle" src="/images/geishas/6.png" alt="img" />
                                        <h3 className="name">Tommy</h3>
                                        <p className="title">Developer</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 item">
                                    <div className="box"><img className="rounded-circle" src="/images/geishas/7.png" alt="img" />
                                        <h3 className="name">Jin Sakai</h3>
                                        <p className="title">Community Manager</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 item">
                                    <div className="box"><img className="rounded-circle" src="/images/geishas/8.png" alt="img" />
                                        <h3 className="name">Caesar</h3>
                                        <p className="title">Community Mod</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 item">
                                    <div className="box"><img className="rounded-circle" src="/images/geishas/9.png" alt="img" />
                                        <h3 className="name">Ohimo</h3>
                                        <p className="title">Community Mod</p>
                                    </div>
                                </div>
                            </div>
                       
                    </div>
                </div>
        </div>
    </div>
  );
};

export default Team;
