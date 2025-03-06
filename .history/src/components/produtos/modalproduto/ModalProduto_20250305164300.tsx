<Popup
  open={isModalOpen}
  onClose={fecharModal}
  modal
  contentStyle={{
    width: "600px",  
    maxWidth: "90%", 
    height: "auto",  
    maxHeight: "80%",  
    padding: "20px",  
    backgroundColor: "#F2DAAC",  // Mudando a cor do fundo
    borderRadius: "10px",  
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",  
    zIndex: 1050,  
    overflowY: "auto",  
  }}
  overlayStyle={{
    backgroundColor: "rgba(0, 0, 0, 0.5)",  
    zIndex: 1040,  
  }}
>
  <FormProduto />  
</Popup>
