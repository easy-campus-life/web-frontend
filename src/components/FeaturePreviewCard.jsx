import React from 'react';
import { Link } from 'react-router-dom';

const FeaturePreviewCard = ({ 
  title, 
  icon, 
  iconBgColor, 
  iconTextColor, 
  to, 
  previewData, 
  alertType, 
  alertText 
}) => {
  return (
    <Link to={to} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
      <div className="flex items-center mb-4">
        <div className={`${iconBgColor} p-3 rounded-full mr-4`}>
          <svg className={`w-6 h-6 ${iconTextColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {icon}
          </svg>
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      
      <p className="text-gray-600 mb-4">{previewData}</p>
      
      {/* Alerte ou notification */}
      {alertText && (
        <div className={`mt-3 p-2 rounded-md ${
          alertType === 'info' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
          alertType === 'warning' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
          alertType === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
          alertType === 'danger' ? 'bg-red-50 text-red-700 border border-red-200' :
          'bg-gray-50 text-gray-700 border border-gray-200'
        }`}>
          <div className="flex items-center">
            {alertType === 'info' && (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {alertType === 'warning' && (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            {alertType === 'success' && (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {alertType === 'danger' && (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="text-sm font-medium">{alertText}</span>
          </div>
        </div>
      )}
    </Link>
  );
};

export default FeaturePreviewCard;
