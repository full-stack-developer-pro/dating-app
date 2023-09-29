const calDiscount = (data) => {
  if(data.offer_price > 0 && data.mrp > 0 && data.offer_price < data.mrp){
    return (((data.mrp-data.offer_price)/data.mrp)*100).toFixed(0).replace(/\.0+$/,'')+'% OFF';
  }
};
 
const getLocalCart = () => {
  var user_cart = JSON.parse(localStorage.getItem("user_cart"));
  if(!user_cart){
    user_cart = [];
  }
  return user_cart;
}

const setLocalCart = (item, qty = null) => {
  var user_cart = JSON.parse(localStorage.getItem("user_cart"));
  if(user_cart){
    var filtered = user_cart.filter((k, g) => {
      return (k.product_id == item.product_id)
    })
    if(filtered.length > 0){
      var filtered = user_cart.map((k, g) => {
        if((k.product_id == item.product_id)){
          if(qty == null){
            var valuee = parseInt(user_cart[g].quantity);
            user_cart[g].quantity  = valuee+1;
          }else{
            user_cart[g].quantity = qty;
          }
        }
      })
    }else{
      user_cart.push(item);
    }
  }else{
    user_cart = [];
    user_cart.push(item);
  }
  localStorage.setItem("user_cart", JSON.stringify(user_cart));
}

const deleteLocalCart = (id) => {
  var user_cart = JSON.parse(localStorage.getItem("user_cart"));
  if(user_cart){
      var user_cart = user_cart.filter((k, g) => {
          return (k.product_id != id)
      })
  }else{
      var user_cart = [];  
  } 
  localStorage.setItem("user_cart", JSON.stringify(user_cart));
}

const emptyLocalCart = (id) => {
  var user_cart = [];
  localStorage.setItem("user_cart", JSON.stringify(user_cart));
}

const getShippingRate = (region) => {
    const regions = [
      {
        "name" : "ZONE A",
        "rate" : 190,
        "regions" : [
          "CBD","PARKLANDS","KILIMANI","NGARA","KILELESHWA","KIBRA","LAVINGTON","HURLINGHAM","RIVERSIDE","KANGEMI","ADAMS","KAWANGWARE","UPPERHILL","DAGORETTI CORNER","WESTLANDS","JAMUHURI"
        ]
      },
      {
        "name" : "ZONE B",
        "rate" : 270,
        "regions" : [
          "LANGATA", "JOGOO ROAD", "KAREN", "EMBAKASI", "SOUTH B/C", "KASARANI", "NAIROBI WEST", "KARIOBANGI", "MADARAKA DANDORA", "MOMBASA ROAD TO JKIA", "PANGANGI", "HIGHRIDGE", "RACECOURSE", "LORESHO", "LENANA", "KITASURU", "MUTHAIGA", "RUNDA", "UMOJA", "WAITHAKA", "LOWER KABETE", "KABIRIA", "KAYOLE"
        ]
      },
      {
        "name" : "KIAMBU COUNTY",
        "rate" : 400,
        "regions" : [
          "UTHIRU", "THIKA", "KINOO", "MUGUGA", "LIMURU", "KIAMBU TOWN", "KIKUYU ", "BANANA", "RUIRU"
        ]
      }
  ];

  var rate = 0;
  regions.map((r, i) => {
    r.regions.map((s, j) => {
      if(s == region){
        rate = r.rate;
      }
    })  
  })

  return rate;
}

const updateCartCount = () => {
  var wrap = document.getElementById('cart-nav-item-li').getElementsByClassName('notification_count');
  if(wrap.length > 0){
    wrap[0].innerHTML = '<h2>'+getLocalCart().length+'</h2>';
  }else{
    document.getElementById('cart-nav-item-li').innerHTML += '<div class="notification_count"><h2>'+getLocalCart().length+'</h2></div>';
  }
}

const setRecentProducts = (item) => {
  var recent_products = JSON.parse(localStorage.getItem("recent_products"));
  if(!recent_products){
    recent_products = [];
  }
  var filteredArray = recent_products.filter(function(itemm, pos){
    return   itemm.id == item.id
  });
  if(filteredArray.length == 0){
    recent_products.push(item);
  }
  localStorage.setItem("recent_products", JSON.stringify(recent_products.slice(-6)));
}

const getRecentProducts = () => {
  var recent_products = JSON.parse(localStorage.getItem("recent_products"));
  if(!recent_products){
    recent_products = [];
  }
  return recent_products;
}

const orderStatus = (data) => {

  return {
    "inprocess" : "In Process",
    "awb_generated" : "AWB Number Generated", 
    "delivered" : "Delivered", 
    "cancelled" : "Cancelled", 
    "order_rejected" : "Order Rejected", 
    "lost_transit" : "Lost in Transit", 
    "order_accepted" : "Order Accepted",
    "in_transit" : "In Transit", 
    "refund_closed" : "Refund Closed", 
    "refund_initiated" : "Refund Initiated",
    "return_received" : "Return Received", 
    "return_initiated" : "Return Initiated", 
    "oup_payment_gateway" : "OUP Payment Gateway",   
    "ready_dispatch" : "Ready for Dispatch"
  }

};

const HelperService = {
  calDiscount,
  getLocalCart,
  setLocalCart,
  deleteLocalCart,
  emptyLocalCart,
  getShippingRate,
  updateCartCount,
  setRecentProducts,
  getRecentProducts,
  orderStatus
}

module.exports = HelperService;