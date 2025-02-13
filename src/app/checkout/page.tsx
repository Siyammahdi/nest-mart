import React from 'react';
import CheckoutForm from './From/CheckoutFrom';
import OrderSummary from './OrderSummary/OrderSummary';

const CheckoutPage = () => {
    return (
        <div className='flex flex-col lg:flex-row mx-5'>
            <CheckoutForm />
            <OrderSummary />
        </div>
    );
};

export default CheckoutPage;