import { Fragment, useEffect, useState } from "react";

import Loader from "../../../components/loader/Loader";

import "./style.scss";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timerId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);
  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <section id="home" className="home">
          <div className="container home__container">
            <div className="home__main">
              <h1>Build your future with us</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque
                minus neque nulla voluptatem unde officiis nihil adipisci eum
                incidunt voluptatum et quaerat natus quia eos, iusto harum optio
                tenetur fugit?
              </p>
              <Link to="/dashboard">Our services</Link>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default HomePage;
