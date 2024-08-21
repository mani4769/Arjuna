// import React from 'react';
// // import './App.css'; // Optional: use an external CSS file if preferred

// const App = () => {
//     return (
//         <div>
//             <header style={{
//                 background: 'linear-gradient(135deg, #007bff, #0056b3)',
//                 color: '#fff',
//                 textAlign: 'center',
//                 padding: '20px 0',
//                 borderBottom: '3px solid #0056b3',
//                 boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)',
//             }}>
//                 <h1 style={{ fontSize: '2em', margin: 0 }}>SRKR Live Cricket Score</h1>
//             </header>

//             <div id="content" style={{
//                 maxWidth: '1200px',
//                 margin: '20px auto',
//                 background: '#fff',
//                 padding: '20px',
//                 borderRadius: '12px',
//                 boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)',
//                 animation: 'fadeIn 1s ease-in',
//             }}>
//                 <section id="team-info" style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     marginBottom: '20px',
//                 }}>
//                     <div className="team" id="teamA-box" style={{
//                         boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)',
//                         padding: '20px',
//                         border: '2px solid #007bff',
//                         borderRadius: '12px',
//                         background: '#f7f9fc',
//                         flex: 1,
//                         margin: '0 10px',
//                         textAlign: 'center',
//                         transition: 'transform 0.3s, box-shadow 0.3s',
//                     }}>
//                         <h2 style={{ fontSize: '28px', marginBottom: '10px', color: '#007bff' }}>Team A</h2>
//                         <p style={{ fontSize: '20px', margin: '5px 0', fontWeight: 'bold' }}>Score: <span id="teamA-score">0</span></p>
//                         <p style={{ fontSize: '20px', margin: '5px 0', fontWeight: 'bold' }}>Overs: <span id="teamA-overs">0.0</span></p>
//                         <p style={{ fontSize: '20px', margin: '5px 0', fontWeight: 'bold' }}>Wickets: <span id="teamA-wickets">0</span></p>
//                     </div>
//                     <div className="team" id="teamB-box" style={{
//                         boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)',
//                         padding: '20px',
//                         border: '2px solid #007bff',
//                         borderRadius: '12px',
//                         background: '#f7f9fc',
//                         flex: 1,
//                         margin: '0 10px',
//                         textAlign: 'center',
//                         transition: 'transform 0.3s, box-shadow 0.3s',
//                     }}>
//                         <h2 style={{ fontSize: '28px', marginBottom: '10px', color: '#007bff' }}>Team B</h2>
//                         <p style={{ fontSize: '20px', margin: '5px 0', fontWeight: 'bold' }}>Score: <span id="teamB-score">0</span></p>
//                         <p style={{ fontSize: '20px', margin: '5px 0', fontWeight: 'bold' }}>Overs: <span id="teamB-overs">0.0</span></p>
//                         <p style={{ fontSize: '20px', margin: '5px 0', fontWeight: 'bold' }}>Wickets: <span id="teamB-wickets">0</span></p>
//                     </div>
//                 </section>

//                 <section id="live-scorecard" style={{
//                     boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)',
//                     marginBottom: '20px',
//                     padding: '15px',
//                     background: '#fefefe',
//                     borderRadius: '12px',
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                 }}>
//                     <h2 style={{ fontSize: '30px', margin: 0, flex: 1, color: '#333' }}>Live Score Card</h2>
//                     <div className="score-summary" style={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         flex: 3,
//                         paddingLeft: '20px',
//                     }}>
//                         <div>
//                             <p style={{ margin: '5px 0', fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>Score: <span id="score">200</span></p>
//                         </div>
//                         <div>
//                             <p style={{ margin: '5px 0', fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>Wickets: <span id="wickets">3</span></p>
//                         </div>
//                         <div>
//                             <p style={{ margin: '5px 0', fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>Overs: <span id="overs">30.0</span></p>
//                         </div>
//                         <div>
//                             <p style={{ margin: '5px 0', fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>No Balls: <span id="no-balls">2</span></p>
//                         </div>
//                         <div>
//                             <p style={{ margin: '5px 0', fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>Wide Balls: <span id="wide-balls">1</span></p>
//                         </div>
//                         <div>
//                             <p style={{ margin: '5px 0', fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>Run Rate: <span id="run-rate">6.67</span></p>
//                         </div>
//                     </div>
//                 </section>

//                 <section id="scorecards" style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     marginTop: '20px',
//                 }}>
//                     <div className="scorecard" id="teamA-scorecard" style={{
//                         flex: 1,
//                         padding: '15px',
//                         background: '#f7f9fc',
//                         borderRadius: '12px',
//                         marginRight: '10px',
//                         transition: 'transform 0.3s, box-shadow 0.3s',
//                         boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)',
//                     }}>
//                         <h3 style={{ fontSize: '26px', marginBottom: '15px', color: '#007bff' }}>Team A Scorecard</h3>
//                         <h4 style={{ fontSize: '22px', marginBottom: '10px', color: '#0056b3' }}>Batsmen</h4>
//                         <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
//                             <thead>
//                                 <tr>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>Batsman</th>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>Runs</th>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>Balls</th>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>4s</th>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>6s</th>
//                                 </tr>
//                             </thead>
//                             <tbody id="teamA-scorecard-body">
//                                 <tr>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>Player A1</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>30</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>20</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>4</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>1</td>
//                                 </tr>
//                                 <tr>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>Player A2</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>40</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>25</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>6</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>2</td>
//                                 </tr>
//                                 <tr>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>Player A2</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>40</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>25</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>6</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>2</td>
//                                 </tr>
//                                 {/* Add more rows as needed */}
//                             </tbody>
//                         </table>
                        
//                         <h4 style={{ fontSize: '22px', marginBottom: '10px', color: '#0056b3' }}>Bowlers</h4>
//                         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                             <thead>
//                                 <tr>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>Bowler</th>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>Overs</th>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>Maidens</th>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>Runs</th>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>Wickets</th>
//                                 </tr>
//                             </thead>
//                             <tbody id="teamA-bowlers-body">
//                                 <tr>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>Player A1</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>10</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>1</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>35</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>2</td>
//                                 </tr>
//                                 <tr>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>Player A1</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>10</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>1</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>35</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>2</td>
//                                 </tr>
//                                 <tr>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>Player A2</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>8</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>0</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>20</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>3</td>
//                                 </tr>
                                
//                                 {/* Add more rows as needed */}
//                             </tbody>
//                         </table>
//                     </div>

//                     <div className="scorecard" id="teamB-scorecard" style={{
//                         flex: 1,
//                         padding: '15px',
//                         background: '#f7f9fc',
//                         borderRadius: '12px',
//                         marginLeft: '10px',
//                         transition: 'transform 0.3s, box-shadow 0.3s',
//                         boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)',
//                     }}>
//                         <h3 style={{ fontSize: '26px', marginBottom: '15px', color: '#007bff' }}>Team B Scorecard</h3>
//                         <h4 style={{ fontSize: '22px', marginBottom: '10px', color: '#0056b3' }}>Batsmen</h4>
//                         <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
//                             <thead>
//                                 <tr>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>Batsman</th>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>Runs</th>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>Balls</th>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>4s</th>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>6s</th>
//                                 </tr>
//                             </thead>
//                             <tbody id="teamB-scorecard-body">
//                                 <tr>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>Player B1</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>25</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>15</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>3</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>2</td>
//                                 </tr>
//                                 <tr>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>Player B2</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>35</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>22</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>4</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>1</td>
//                                 </tr>
//                                 <tr>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>Player B2</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>35</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>22</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>4</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>1</td>
//                                 </tr>
//                                 {/* Add more rows as needed */}
//                             </tbody>
//                         </table>
                        
//                         <h4 style={{ fontSize: '22px', marginBottom: '10px', color: '#0056b3' }}>Bowlers</h4>
//                         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                             <thead>
//                                 <tr>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>Bowler</th>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>Overs</th>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>Maidens</th>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>Runs</th>
//                                     <th style={{ padding: '10px 15px', border: '1px solid #ddd', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>Wickets</th>
//                                 </tr>
//                             </thead>
//                             <tbody id="teamB-bowlers-body">
//                                 <tr>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>Player B1</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>9</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>0</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>30</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>1</td>
//                                 </tr>
//                                 <tr>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>Player B2</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>10</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>1</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>40</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>4</td>
//                                 </tr>
//                                 <tr>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>Player B3</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>10</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>1</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>40</td>
//                                     <td style={{ padding: '10px', border: '1px solid #ddd' }}>4</td>
//                                 </tr>
//                                 {/* Add more rows as needed */}
//                             </tbody>
//                         </table>
//                     </div>
//                 </section>
//             </div>
//         </div>
//     );
// };

// export default App;
