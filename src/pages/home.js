import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../components/layouts/MainLayout'
import { useSelector } from 'react-redux'
import { authSelector } from '../redux/slices/authSlice'
import Banner from '../banner/banner'
import toast from 'react-hot-toast'
import pricesRanges from '../components/filters/priceRange'
import { searchSelecter } from '../redux/slices/searchSlice'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './home.css'
const Home = () => {
  const [products, setProducts] = useState([]);
  const auth = useSelector(authSelector);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState();
  const categoryRefs = useRef([]);
  const brandRefs = useRef([]);
  const priceRefs = useRef([]);
  const [count, setCount] = useState();
  const [page, setPage] = useState(1);
  const searchKey = useSelector(searchSelecter);
  const categoryRefs2 = useRef([]);
  const brandRefs2 = useRef([]);
  const priceRefs2 = useRef([]);

  const nav = useNavigate();

  const clearHandle = () => {
    setSelectedBrand([]);
    setSelectedCat([]);
    setPriceRange();
    categoryRefs.current.forEach((e) => {
      e.checked = false
    })
    brandRefs.current.forEach((e) => {
      e.checked = false
    })
    priceRefs.current.forEach((e) => {
      e.checked = false
    })
    categoryRefs2.current.forEach((e) => {
      e.checked = false
    })
    brandRefs2.current.forEach((e) => {
      e.checked = false
    })
    priceRefs2.current.forEach((e) => {
      e.checked = false
    })
  }
  const filterProduct = (reset = false) => {
    console.log(process.env.REACT_APP_API);
    fetch(`${process.env.REACT_APP_API}/api/product/getFilterProduct/${reset ? 1 : page}`, {
      method: "POST",
      headers: {
        "Authorization": auth.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        selectedBrand, selectedCat, priceRange, searchKey
      })
    }).then((res) => res.json()).then((x) => {
      if (x.success) {
        setCount(x.count)
        if (reset) {
          setProducts([...x.products])
        }
        else {
          setProducts([...products, ...x.products])
        }

      }
      else {
        toast.error(x.message);

      }
    })
  }
  const getBrands = () => {
    fetch(`${process.env.REACT_APP_API}/api/product/getAllBrands`).then((res) => res.json()).then((x) => {
      if (x.success) {
        setBrands(x.brands)
      }
      else {
        toast.error(x.message);
      }
    })
  }
  const handleCheck = (checked, id) => {
    console.log(id)
    if (checked) {
      setSelectedCat([...selectedCat, id])
    }
    else {
      setSelectedCat((prev) => prev.filter((e) => e !== id));
    }
  }
  const handleCheckBrand = (checked, id) => {
    if (checked) {
      setSelectedBrand([...selectedBrand, id])
    }
    else {
      setSelectedBrand((prev) => prev.filter((e) => e !== id));
    }

  }
  const getCat = () => {
    fetch(`${process.env.REACT_APP_API}/api/category/getCategories`, {
      method: "GET",
      headers: {
        "Authorization": auth.token
      }
    }).then((res) => res.json()).then((x) => { setCategories(x.categories) }
    );
  }
  useEffect(() => {
    setPage(1)
    filterProduct(true);
    getCat();
    getBrands();
  }, [])
  useEffect(() => {

    setPage(1);
    filterProduct(true);
  }, [selectedBrand, selectedCat, priceRange, searchKey])




  useEffect(() => {
    if (page > 1) filterProduct();
  }, [page]);



  return (
    <MainLayout>
      {searchKey ? '' : (
        <>
          <div className=' d-flex justify-content-center align-items-center' style={{ width: "100%", height: "auto" }}>
            <div style={{ minWidth: "50%", height: "100%" }}>
              <ul className='d-flex flex-row justify-content-between m-0 p-2' style={{ listStyle: 'none' }}>
                {categories.map((c,i) => {
                  
                  return i>=3?'':<Link to={`/category/${c.slug}`}><li className=' btn text-dark ms-2' style={{ borderRadius: '10px', padding: '7px', border: '2px solid black' }}>{c.name}</li></Link>
                })}

              </ul>
            </div>
          </div>
          <Banner />
        </>
      )}

      <div className='row' style={{ width: "100vw" }}>
        <div className='col-md-3 text-center p-5 catShow'>
          <div>
            Category:
            <div className="p-3">
              <div className='d-flex flex-column'>
                {categories.map((e, index) => {
                  return <div className="form-check form-check-inline d-flex justify-content-start">
                    <input className="form-check-input m-2" type="checkbox" id={`s${e._id}`} name="categoryFilter"
                      onChange={(x) => { handleCheck(x.target.checked, e._id) }}
                      ref={(e) => categoryRefs.current[index] = e} />
                    <label className="form-check-label" htmlFor={`s${e._id}`} >{e.name}</label>
                  </div>
                })}
              </div>
            </div>
          </div>
          <div>
            Brand:
            <div className="p-3">
              <div className='d-flex flex-column'>
                {brands.map((e, index) => {
                  return <div className="form-check form-check-inline d-flex justify-content-start">
                    <input className="form-check-input m-2" type="checkbox" id={`s${e._id}`} name="brandFilter"
                      ref={(e) => brandRefs.current[index] = e}
                      onChange={(x) => { handleCheckBrand(x.target.checked, e._id) }} />
                    <label className="form-check-label" htmlFor={`s${e._id}`} >{e._id}</label>
                  </div>
                })}
              </div>
            </div>
          </div>
          <div>
            Price:
            <div className="p-3">
              <div className='d-flex flex-column'>

                {pricesRanges.map((p, index) => {
                  return <div className="form-check form-check-inline d-flex justify-content-start">
                    <input className="form-check-input m-2" type="radio" id={`${p.name}`} name="priceFilter"
                      ref={(e) => priceRefs.current[index] = e}
                      onChange={() => setPriceRange(p.range)} />
                    <label className="form-check-label" htmlFor={`${p.name}`} >{p.name}</label>
                  </div>
                })}
              </div>
            </div>
          </div>
          <div>
            <button className='btn btn-primary' onClick={clearHandle}>Clear</button>
          </div>
        </div>


        <div className='toggleShow mb-3'>
          <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
            Filter
          </button>

          <div class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="staticBackdropLabel">Filter</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <div>
                <div className='col-md-3 text-center p-5'>
                  <div>
                    Category:
                    <div className="p-3">
                      <div className='d-flex flex-column'>
                        {categories.map((e, index) => {
                          return <div className="form-check form-check-inline d-flex justify-content-start">
                            <input className="form-check-input m-2" type="checkbox" id={`s${e._id}`} name="categoryFilter"
                              onChange={(x) => { handleCheck(x.target.checked, e._id) }}
                              ref={(e) => categoryRefs2.current[index] = e} />
                            <label className="form-check-label" htmlFor={`s${e._id}`} >{e.name}</label>
                          </div>
                        })}
                      </div>
                    </div>
                  </div>
                  <div>
                    Brand:
                    <div className="p-3">
                      <div className='d-flex flex-column'>
                        {brands.map((e, index) => {
                          return <div className="form-check form-check-inline d-flex justify-content-start">
                            <input className="form-check-input m-2" type="checkbox" id={`s${e._id}`} name="brandFilter"
                              ref={(e) => brandRefs2.current[index] = e}
                              onChange={(x) => { handleCheckBrand(x.target.checked, e._id) }} />
                            <label className="form-check-label" htmlFor={`s${e._id}`} >{e._id}</label>
                          </div>
                        })}
                      </div>
                    </div>
                  </div>
                  <div>
                    Price:{count}
                    <div className="p-3">
                      <div className='d-flex flex-column'>

                        {pricesRanges.map((p, index) => {
                          return <div className="form-check form-check-inline d-flex justify-content-start">
                            <input className="form-check-input m-2" type="radio" id={`${p.name}`} name="priceFilter"
                              ref={(e) => priceRefs2.current[index] = e}
                              onChange={() => setPriceRange(p.range)} />
                            <label className="form-check-label" htmlFor={`${p.name}`} >{p.name}</label>
                          </div>
                        })}
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className='btn btn-primary' onClick={clearHandle}>Clear</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className='col-md-9 full ' >
          <div className='d-flex flex-row bg-light' style={{ width: "100%", flexFlow: 'wrap', justifyContent: "flex-start", margin: "auto" }}>
            {products.map((e) => (
              <div className=' card prodCard m-2' style={{ overflow: "hidden", cursor: 'pointer' }} onClick={() => nav(`/product/${e.slug}`)}>
                <div style={{ height: "65%", width: "100%", overflow: "hidden", display: "flex", alignItems: "center" }}>
                  <img src={`${process.env.REACT_APP_API}/api/product/getPhoto/${e._id}`} className="card-img-top" alt={e.name} style={{ height: "auto", width: "100%" }} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{e.name}</h5>
                  <p className="card-text">₹ {e.price}</p>
                </div>
              </div>
            ))}

          </div>
          {products.length < count ? <div className='text-center'><button className='btn btn-primary mb-3 mt-3' onClick={() => setPage((prev) => prev + 1)}>loadmore</button></div> : ''}

        </div>



      </div>

    </MainLayout>
  )
}

export default Home