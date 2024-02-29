import { createSlice, createSelector,PayloadAction } from '@reduxjs/toolkit';


export interface CartState{
    items:any;
    deliveryFee:any;
    freeDeliveryFrom:any;
}


const initialState: CartState = {
    items:[],
    deliveryFee: 15,
    freeDeliveryFrom: 200,
};

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        receivedCartItem:(state,action:PayloadAction<CartState[]>)=>{
            const cartItems = action.payload;
            console.log('cart-length=>',cartItems.length);
            console.log(state);
            // cartItems.forEach((cartItem) => {
            //     state.items.push({product:cartItem?.productId,quantity:cartItem?.quantity});
            // })
        },
        addCartItem:(state,action)=>{
            const newProduct = action.payload.product;
            console.log(' cart item ' );
            console.log(newProduct);
            const cartItem = state.items.find(
                (item:any)=> item.product._id === newProduct._id
            );
            if(cartItem){
                cartItem.quantity += 1
            }else{
                state.items.push({product: newProduct, quantity: 1})
            }
            
        },

        changeQuantity:(state,action)=>{
            const { productId, amount} = action.payload;
            const cartItem = state.items.find(
                (item:any)=> item.product._id === productId
            );
            if(cartItem){
                cartItem.quantity += amount;
            }

            if(cartItem.quantity <= 0){
                state.items = state.items.filter((item:any) => item !== cartItem);
            }
        },
        clear:(state)=>{
            state.items = [];
        }

    }
});
export const { receivedCartItem,addCartItem } = cartSlice.actions;
export const selectNumberOfItems = (state:any) => state.cart.items.length;

export const selectSubtotal = (state:any) =>
  state.cart.items.reduce(
    (sum:any, cartItem:any) => sum + cartItem.product.price * cartItem.quantity,
    0
  );

const cartSelector = (state:any) => state.cart;

export const selectDeliveryPrice = createSelector(
  cartSelector,
  selectSubtotal,
  (cart, subtotal) => (subtotal > cart.freeDeliveryFrom ? 0 : cart.deliveryFee)
);

export const selectTotal = createSelector(
  selectSubtotal,
  selectDeliveryPrice,
  (subtotal, delivery) => subtotal + delivery
);