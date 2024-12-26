import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import Modal from '../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import { modalFunc } from '../redux/modalSlice';
import { createDataFunc, updateDataFunc } from '../redux/dataSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const Product = () => {
  const modal = useSelector(state => state.modal.modal);
  const  keyword = useSelector(state => state.data.keyword);
  const data = useSelector(state => state.data.data);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productInfo, setProductInfo] = useState({name:"",price:"",url:""})

const onChangeFunc = (e, type) => {
  if(type == "url"){
    setProductInfo(prev =>({...prev,[e.target.name]:URL.createObjectURL(e.target.files[0])}))
  }else {
    setProductInfo(prev =>({...prev, [e.target.name]: e.target.value}))
  }
}
  let loc = location?.search.split('=')[1]
  useEffect(() =>{
    if(loc){
      setProductInfo(data.find(dt => dt.id == loc))
    }
  },[loc])

  console.log(data,"data");
  
  const buttonFunc = () => {
    dispatch(createDataFunc({...productInfo, id: data.length + 1}));
    dispatch(modalFunc());
  }

  const buttonUpdateFunc = () => {
    dispatch(updateDataFunc({...productInfo, id:loc} ))
    dispatch(modalFunc());
    navigate("/");
  }
  const contentModal = (
    <><Input value={productInfo.name} type="text" placeholder={"Ürün ekle"} name={"name"} id={"name"} 
    onChange={e => onChangeFunc(e, "name")}/>
    <Input value={productInfo.price} type="text" placeholder={"Fiyat ekle"} name={"price"} id={"price"} 
    onChange={e => onChangeFunc(e, "price")}/>
    <Input type="file" placeholder={"Resim ekle"} name={"url"} id={"url"} 
    onChange={e => onChangeFunc(e, "url")}/>
    <Button btnText={loc ? "Ürün Güncelle":"Ürün Olustur"} onClick={loc ? buttonUpdateFunc : buttonFunc} /></>
  )

  const filteredItems = data.filter(dt => dt.name.toLowerCase().includes(keyword));
  console.log(keyword,"keyword");
  return (
    <div>
      <div className='flex items-center flex-wrap'>
        {
          filteredItems?.map((dt, i) =>(
            <ProductCard key={i} dt={dt}/>
          ))
          
        } 
      </div>
    
     {modal && <Modal content={contentModal} title={loc ? "Ürün Güncelle":"Ürün Olustur"} />}
    </div>
  )
}

export default Product
