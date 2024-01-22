import './compaign.css';


const accentColor = '#FF6F00';

  const listItemStyle = {
    color: accentColor,
  };


function Compaign(){
   
    return(
    <div>
        <h1>OL-Cards</h1>
<ol>
  <li >
    
    <div className="icon" style={{fontSize:"40px"}}><i className="fa-light fa-lightbulb-exclamation-on"></i></div>
    <div className="title">Create Campaign</div>
    {/* <div className="descr">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</div> */}
  </li>
  <li style={{accentColor:" #008DC2"}}>
    <div className="icon" style={{fontSize:"40px"}}><i className="fa-regular fa-address-book"></i></div>
    <div className="title">Add Compaign</div>
    {/* <div className="descr">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</div> */}
  </li>
  <li style={{accentColor: "#0B456A"}}>
    <div className="icon" style={{fontSize:"40px"}}><i className="fa-light fa-chart-line-up"></i></div>
    <div className="title">Growth</div>
    {/* <div className="descr">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</div> */}
  </li>
  {/* <li style={{accentColor: "#6A829A"}}>
    <div className="icon"><i className="fa-light fa-chart-mixed"></i></div>
    <div className="title">Benifits</div>
    <div className="descr">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</div>
  </li> */}
</ol>

</div>
    )
}
export default Compaign;