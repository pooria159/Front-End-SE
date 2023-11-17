import { Fragment, useState, useEffect } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ClipLoader from "react-spinners/ClipLoader";
import useAnncCard from '../../hooks/useAncCard'
import Card from './AnncCard'

import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { useCityCountry } from '../../hooks/useCityCountry';

import Select from 'react-select';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const fetchCityCountry = async (type, relevent = "") => {
  let obj = [];
  if(type == "country"){
      const response = await useCityCountry("country"); 
      for (var item in response){
          obj.push({"value" : response[item]["country_name"], "label" : response[item]["country_name"]});
      }
  }
  else if(type == "state"){
      const response = await useCityCountry("state", relevent); 
      for (var item in response){
          obj.push({"value" : response[item]["state_name"], "label" : response[item]["state_name"]});
      }
  }
  else if(type == "city"){
      const response = await useCityCountry("city", relevent); 
      for (var item in response){
          obj.push({"value" : response[item]["city_name"], "label" : response[item]["city_name"]});
      }
  }
  return obj;
}



const sortOptions = [
  { label: 'number of travelers', value: "numberoftravelers.asc", icon: FaAngleUp },
  { label: 'number of travelers', value: "numberoftravelers.des", icon: FaAngleDown },
  { label: 'start date', value: "startdate.asc", icon: FaAngleUp },
  { label: 'start date', value: "startdate.des", icon: FaAngleDown },
  { label: 'end date', value: "enddate.asc", icon: FaAngleUp },
  { label: 'end date', value: "enddate.des", icon: FaAngleDown },
];

const formatOptionLabel = ({ label, icon: Icon }) => (
  <div className='flex justify-center items-center space-x-1'>
    <div>
      {label} 
    </div>
    <Icon />
  </div>
);
const formatOptionLabel2 = ({ label }) => (
  <div className='flex justify-center items-center space-x-1'>
    <div className='text-sm'>
      {label} 
    </div>
  </div>
);



const Loading = () => {
  return (

      <div className='lg:col-span-7 justify-center items-center space-y-5'>
        <div className="flex flex-wrap justify-center items-center">
          <ClipLoader color="#2563EB" size={150} />
        </div>
      </div>
  );
};


const NotFound = () => {
  const gifUrl = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTRzOXEwcjR6dTQxYjdjcThlaHZtc2Y0YzlncGN5MnJqOW1hcHhscSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8L0Pky6C83SzkzU55a/giphy.gif'; // replace with your gif URL

  return (
    <div className='mb-24 w-full h-full text-2xl flex flex-col justify-center items-center'>
      <img src={gifUrl} alt="No data found" />
    </div>
  );
};


export default function AnncPanel() {

  const [cardData, setCardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [controlObject, setControlObject] = useState({
    "currentPage" : 1,
    "sort" : "numberoftravelers.asc",
    "pageSize" : 4,
    "city" : "",
    "state" : "",
    "country" : "",
  });
  const maxPageNumbersToShow = 3; // for ... in pagination 

  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await useAnncCard(controlObject);
    if(!data.data.Cards)
      setNotFound(true);
    else
      setNotFound(false);

    setCardData(data.data.Cards);
    setIsLoading(false);
  }


  const Pagination = ({ total }) => {
    
  
    const handlePageChange = (pageNumber) => {

      setControlObject(prevState => ({
        ...prevState,
        currentPage: pageNumber
      }));

    };
  
    const renderPageNumbers = () => {
      let pageNumbers = [];
      let startPage = Math.max(1, controlObject.currentPage - Math.floor(maxPageNumbersToShow / 2));
      let endPage = Math.min(total, startPage + maxPageNumbersToShow - 1);
      startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
  
      for (let i = startPage; i <= endPage; i++) {
        if (i === controlObject.currentPage) {
          pageNumbers.push(<a key={i}  aria-current="page" class="hover:cursor-pointer relative rounded-lg z-10 inline-flex items-center bg-indigo-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{i}</a>);
        } else {
          pageNumbers.push(<a key={i}  onClick={() => handlePageChange(i)} class="hover:cursor-pointer relative rounded-lg inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">{i}</a>);
        }
      }
  
      if (startPage >= 2) {
        pageNumbers.unshift(<span key="start-ellipsis" class="hover:cursor-pointer relative rounded-lg inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>);
        pageNumbers.unshift(<a key={1}  onClick={() => handlePageChange(1)} class="hover:cursor-pointer relative rounded-lg inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">1</a>);
      }
      if (endPage <= total - 1) {
        pageNumbers.push(<span key="end-ellipsis" class="hover:cursor-pointer relative rounded-lg inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>);
        pageNumbers.push(<a key={total} onClick={() => handlePageChange(total)} class="hover:cursor-pointer relative rounded-lg inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">{total}</a>);
      }
  
      return pageNumbers;
    };
  
    return (
      <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
          <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
          <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              {renderPageNumbers()}
            </nav>
          </div>
        </div>
      </div>
    );
  }
  

  const handleSortChange = (option) => {

    setControlObject(prevState => ({
      ...prevState,
      sort: option.value
    }));

  }

  const handleCountryChange = (option) => {

    if(option)
      setControlObject(prevState => ({
        ...prevState,
        country: option.value
      }));
    else
      setControlObject(prevState => ({
        ...prevState,
        country: ""
      }));

  }


  const handleStateChange = (option) => {

    if(option)
      setControlObject(prevState => ({
        ...prevState,
        state: option.value
      }));
    else
      setControlObject(prevState => ({
        ...prevState,
        state: ""
      }));

  }

  const handleCityChange = (option) => {
    if(option)
      setControlObject(prevState => ({
        ...prevState,
        city: option.value
      }));
    else
      setControlObject(prevState => ({
        ...prevState,
        city: ""
      }));

  }

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      borderColor: '#9095a0',
      paddingLeft: '0.25rem',
      color: '#4a5568',
      height: '2rem',
      width: '13rem',
      marginLeft: '0.25rem',
    }),
  };
  const customStyles2 = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      borderColor: '#9095a0',
      paddingLeft: '0.25rem',
      color: '#4a5568',
      height: '2rem',
      width: '10rem',
      marginLeft: '0.25rem',
    }),
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [controlObject]);

  useEffect(() => {
    fetchCityCountry('country').then(setCountryOptions);
  }, []);
  useEffect(() => {
    if(controlObject.country != "")
      fetchCityCountry('state', controlObject.country).then(setStateOptions);
  }, [controlObject.country]);
  useEffect(() => {
    if(controlObject.state != "")
      fetchCityCountry('city', controlObject.state).then(setCityOptions);
  }, [controlObject.state]);

  return (
    <div >
      <div>
        {/* Mobile filter dialog */}

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Travelers' Announcements</h1>

            <div className="flex items-center space-x-2">
              {/* react select  for sort */}
              <div className='flex flex-col items-center'>
                <label >
                  Country
                </label>
                <Select 
                  styles={customStyles2}
                  options={countryOptions} 
                  onChange={(selectedOption) => handleCountryChange(selectedOption)}
                  formatOptionLabel={formatOptionLabel2}
                  isSearchable = {true}
                  isClearable={true}
                />
              </div>
              <div className='flex flex-col items-center'>
                <label >
                  State
                </label>
                <Select 
                  styles={customStyles2}
                  options={stateOptions} 
                  onChange={(selectedOption) => handleStateChange(selectedOption)}
                  formatOptionLabel={formatOptionLabel2}
                  isSearchable = {true}
                  isClearable={true}
                />
              </div>
              <div className='flex flex-col items-center'>
                <label >
                  City
                </label>
                <Select 
                  styles={customStyles2}
                  options={cityOptions} 
                  onChange={(selectedOption) => handleCityChange(selectedOption)}
                  formatOptionLabel={formatOptionLabel2}
                  isSearchable = {true}
                  isClearable={true}
                />
              </div>
              <div className='flex flex-col items-center'>
                  <label >
                    Sort
                  </label>
                  <Select 
                    styles={customStyles}
                    options={sortOptions} 
                    defaultValue={sortOptions[0]}
                    onChange={(selectedOption) => handleSortChange(selectedOption)}
                    formatOptionLabel={formatOptionLabel}
                    isSearchable = {false}
                    
                  />
              </div>
              
            </div>
          </div>

          {notFound ? <NotFound/> :<section aria-labelledby="products-heading" className="pb-24 pt-6">

            <div className="grid grid-cols-1s gap-x-1 gap-y-10 lg:grid-cols-7">
              {/* Filters */}

              {/* Product grid */}
              <div className='lg:col-span-7 justify-center items-center space-y-5'>
                {isLoading ? <Loading/> : 
                  <div className="lg:col-span-7 flex flex-wrap justify-center items-center">
                    {cardData && cardData.map((data, index) => {
                        return <Card key={index} data ={data} />
                    })}
                  
                  </div>
                }
                <div className="flex flex-wrap justify-center items-center">
                  <Pagination total={10}/>
                </div>
              </div>
            </div>
              
          </section>}
        </main>
      </div>
    </div>
  )
}
