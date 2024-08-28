import { connect } from "react-redux";


const Layout = ({children}) => {
    return (
        <div>
            {children}
        </div>
    )
}


const mapStateToProps=state=>({

})

export default connect(mapStateToProps,{
    
}) (Layout);
