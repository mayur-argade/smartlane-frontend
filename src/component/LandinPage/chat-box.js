// import { useState, useEffect } from "react";
// import ClearIcon from "@mui/icons-material/Clear";
// import MinimizeIcon from "@mui/icons-material/Minimize";
// import CropSquareIcon from "@mui/icons-material/CropSquare";
// import SendIcon from "@mui/icons-material/Send"; // Import SendIcon from Material-UI
// import TextField from "@mui/material/TextField";

// const ChatBox = (props) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState();

//   useEffect(() => {
//     setMessages(props.chat);
//   }, [props.chat]);

//   return (
//     <Draggable>
//       <div
//         style={{
//           position: "absolute",
//           right: "0",
//           top: "0",
//           border: "1px solid #000",
//           padding: "10px",
//           width: "230px",
//           fontSize: "10px",
//           zIndex: "7",
//           background: "rgba(64, 64, 64, 0.85)",
//           //   backgroundColor: "#fff",
//         }}
//       >
//         <div style={{ display: "flex", justifyContent: "flex-end" }}>
//           <ClearIcon
//             size="small"
//             style={{ color: "#fff", cursor: "pointer", fontSize: 18 }}
//             onClick={() => {
//               props.close();
//             }}
//           />
//         </div>
//         <div>
//           {messages.map((msg) => {
//             return (
//               <div
//                 style={{
//                   display: "flex",
//                   color: "white",
//                   paddingTop: "10px",
//                 }}
//               >
//                 {" "}
//                 <div style={{ flex: "1" }}>
//                   <div
//                     style={{
//                       width: "20px",
//                       height: "20px",
//                       borderRadius: "50%",
//                       backgroundColor: msg.type === "1" ? "deeppink" : "purple",
//                       textAlign: "center",
//                     }}
//                   >
//                     V
//                   </div>
//                 </div>
//                 <div style={{ flex: "2" }}>
//                   {" "}
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       flexDirection: "column",
//                     }}
//                   >
//                     {" "}
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <div style={{ fontWeight: "600" }}>{msg.name} </div>
//                       <div style={{ color: "darkgrey" }}>{msg.time} </div>
//                     </div>
//                     <div style={{ paddingTop: "8px" }}>{msg.message}</div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <div
//           style={{
//             display: "flex",
//             color: "white",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           {" "}
//           <div>
//             <div
//               style={{
//                 width: "20px",
//                 height: "20px",
//                 borderRadius: "50%",
//                 backgroundColor: "#b9b2dc",
//                 textAlign: "center",
//               }}
//             >
//               V
//             </div>
//           </div>
//           <div>
//             <TextField
//               placeholder="start typing"
//               variant="outlined"
//               InputProps={{
//                 style: {
//                   fontFamily: "Arial",
//                   color: "white",
//                   fontSize: "small",
//                 },
//                 endAdornment: (
//                   <SendIcon
//                     style={{
//                       color: "#b9b2dc",
//                       cursor: "pointer",
//                     }}
//                     onClick={() => {
//                       const messageArray = [
//                         ...messages,
//                         {
//                           type: "2",
//                           name: "You",
//                           message: input,
//                           time: "Just now",
//                         },
//                       ];
//                       setMessages(messageArray);
//                     }}
//                   />
//                 ),
//               }}
//               value={input}
//               style={{
//                 width: "100%",
//                 background: "rgba(64, 64, 64, 0.7)", // Adjust the alpha value here
//                 margin: "10px 0",
//                 padding: 0,
//                 color: "white !important",
//               }}
//               size="small" // Set the size to small
//               onChange={(e) => {
//                 setInput(e.target.value);
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </Draggable>
//   );
// };

// export default ChatBox;
