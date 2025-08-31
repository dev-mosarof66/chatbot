/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

const Pricing = () => {
  const navigate = useNavigate();

  const tiers = [
    {
      name: 'Free',
      price: '$0',
      features: [
        'Access to basic chatbot features',
        'Limited number of queries per day',
        'Community support',
      ],
      buttonText: 'Get Started',
      isPrimary: false,
    },
    {
      name: 'Basic',
      price: '$9.99/mo',
      features: [
        'Unlimited queries',
        'Access to advanced chatbot features',
        'Priority support',
      ],
      buttonText: 'Upgrade Now',
      isPrimary: true,
      popular: true,
    },
    {
      name: 'Pro',
      price: '$29.99/mo',
      features: [
        'All Basic features',
        'Customizable AI responses',
        'Dedicated account manager',
        'Early access to new features',
      ],
      buttonText: 'Go Pro',
      isPrimary: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-white flex flex-col items-center px-4 py-12">
      <h2 className="text-4xl font-extrabold mb-6 text-center">Pricing Plans</h2>
      <p className="text-gray-400 max-w-2xl text-center mb-12">
        Choose the plan that best fits your needs and start chatting smarter today.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {tiers.map((tier) => (
          <motion.div
            key={tier.name}
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`relative flex flex-col justify-between p-6 rounded-2xl shadow-lg border cursor-pointer 
              ${tier.isPrimary ? 'bg-purple-600 text-white border-purple-600' : 'bg-gray-800 border-gray-700'}
            `}
          >
            {/* Most Popular Badge */}
            {tier.popular && (
              <span className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-xs font-semibold px-2 py-1 rounded-full uppercase">
                Most Popular
              </span>
            )}

            <div>
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-3xl font-extrabold mb-4">{tier.price}</p>
              <ul className="mb-6 space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <span className="mr-2 text-green-400">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => navigate('/model-auto')}
              className={`mt-auto px-6 py-3 rounded-lg font-semibold transition
                ${tier.isPrimary
                  ? 'bg-white text-purple-600 hover:bg-gray-100'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
                }
               cursor-pointer transition duration-300 delay-75`}
            >
              {tier.buttonText}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
