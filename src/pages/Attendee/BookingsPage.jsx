import React from 'react';
import PackageCard from '../../components/PackageCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingsPage = () => {
  return (
    <div className="container-fluid p-0">

      <header className="text-white text-center py-4 mb-3" style={{ backgroundColor: '#E2215F' }}>
        <h2>Choose Your Package</h2>
        <p className="lead">Pick the plan that suits you best and enjoy the event!</p>
      </header>

      <main className="container mb-5">
        <div className="row g-3 justify-content-center">
          <div className="col-md-6 col-lg-4 d-flex justify-content-center">
            <PackageCard
              title="Silver"
              price={1000}
              seats={50}
              features={[
                { name: 'Standard Seat', included: true },
                { name: '1 Free Drink', included: true },
                { name: 'Backstage Access', included: false },
              ]}
              highlight={false}
            />
          </div>
          <div className="col-md-6 col-lg-4 d-flex justify-content-center">
            <PackageCard
              title="Platinum"
              price={2000}
              seats={20}
              features={[
                { name: 'VIP Seat', included: true },
                { name: 'Unlimited Drinks', included: true },
                { name: 'Backstage Access', included: true },
              ]}
              highlight={true}
            />
          </div>
          <div className="col-md-6 col-lg-4 d-flex justify-content-center">
            <PackageCard
              title="Gold"
              price={1500}
              seats={30}
              features={[
                { name: 'Premium Seat', included: true },
                { name: '2 Free Drinks', included: true },
                { name: 'Backstage Access', included: false },
              ]}
              highlight={false}
            />
          </div>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-lg btn-primary">Buy Now</button>
        </div>
      </main>

    </div>
  );
};

export default BookingsPage;
