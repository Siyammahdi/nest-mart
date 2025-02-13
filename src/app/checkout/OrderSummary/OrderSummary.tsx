import Image from "next/image";

const OrderSummary = () => {
    return (
      <div className="h-fit my-12 mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your order</h2>
        
        <div className="bg-gray-100 p-3 rounded-lg text-sm font-medium text-gray-700 flex justify-between">
          <span>Product</span>
          <span>Subtotal</span>
        </div>
        
        <div className="py-4 flex items-center gap-4 border-b border-gray-200">
          <Image 
            src="/products/product6.jpg" 
            alt="Product" 
            className="w-14 h-14 rounded-lg object-cover"
            height={200}
            width={200}
          />
          <div className="flex-1">
            <p className="font-medium text-gray-900">Angie’s Sweet & Salty Kettle Corn</p>
            <p className="text-sm text-gray-600">× 1</p>
            <p className="text-sm text-gray-500">Vendor: Country Crock</p>
          </div>
          <span className="font-semibold text-gray-900">$48.85</span>
        </div>
        
        <div className="py-2 flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span className="font-semibold">$48.85</span>
        </div>
        
        <div className="py-2 flex justify-between text-gray-900 text-lg font-bold border-t border-gray-200 mt-2">
          <span>Total</span>
          <span>$48.85</span>
        </div>
      </div>
    );
  };
  
  export default OrderSummary;
  