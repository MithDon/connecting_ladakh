// loader.js

// Import necessary packages


export const Loader = () => {
  const [show,setShow] = useState(false);
  
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:88,
    backgroundColor:'rgba(52, 52, 52, 0.8)'
  },

  loadingHide:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex:-1,
  }
})
