import React from 'react';
import { Link } from 'react-router-dom';
import './landing-page.css';

export default function LandingPage() {
  return (
    <div className="overview">
      <h2>
        Welcome to KanDo
      </h2>
      <p>
        Possimus id et nulla animi officiis quia nobis. Commodi esse necessitatibus quo eum nam quia facere. Nihil dolor porro doloribus eaque culpa commodi eos animi voluptatem. Quasi molestias recusandae eveniet. Non corporis et nesciunt quia officiis animi. Ut modi ut repellendus harum sint asperiores soluta.
      </p>
      <p>
        Laborum autem et quasi eius est. Nulla in consectetur. Distinctio cupiditate ut eius a eos dignissimos voluptatum asperiores reprehenderit. Voluptatibus omnis quia. Minima quia ut atque.
      </p>
      <p className="signup-link">
        New user? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}
