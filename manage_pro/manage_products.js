var products = [];
var productId = 1;
var divAddProduct = document.getElementById("divAddProduct");
var divListProducts = document.getElementById("divListProducts");
var aAddProduct = document.getElementById("aAddProduct");

retrievevalue();

function retrievevalue()
{
	var pro=localStorage.getItem("store");
	products=JSON.parse(pro);
	if(products!=null)
	{
		var n=products.length;
		var i=0;
		while(i<n)
		{
			addProducttoDOM(products[i++]);
		}
		console.log(products);
	}
	else
	{
		products=[];
	}
}

aAddProduct.addEventListener("click", function(event)
									  {
											createNewProductPanel();
											divListProducts.setAttribute("style","visibility:hidden");
									  }
						    );

function addProducttoArray()
{

	var objProduct = new Object();

	objProduct.Id = productId;
 	objProduct.Name = document.getElementById("txtProductName").value;
    objProduct.Desc = document.getElementById("txtProductDesc").value;
	objProduct.Price = document.getElementById("txtProductPrice").value;
	objProduct.Quantity = document.getElementById("txtProductQuantity").value;

    products.push(objProduct);
	addProducttoDOM(objProduct);
    storevalues();
	deleteNewProductPanel();

}

function addProducttoDOM(objProduct)
{

	//create a new DIV for this product
	objProduct.Id = productId;
	var divProduct = document.createElement("div");
	divProduct.setAttribute("id", productId);
/*	console.log("divProduct.id "+divProduct.id);
	console.log(productId);
*/
	//create a anchor for product name
	var aProductName = document.createElement("label");
	aProductName.setAttribute("href","#");
	aProductName.innerHTML = "Product Name: " + objProduct.Name;
	divProduct.appendChild(aProductName);

	insertBlankLine(divProduct);

	//create a label for product description
	var ProductDesc = document.createElement("label");
	ProductDesc.innerHTML = "Product Description: " + objProduct.Desc;
    divProduct.appendChild(ProductDesc);

    insertBlankLine(divProduct);
	//create a label for product price
	var ProductPrice = document.createElement("label");
	ProductPrice.innerHTML = "Product Price: " + objProduct.Price;
    divProduct.appendChild(ProductPrice);

    insertBlankLine(divProduct);

		//create a label for product quantity
		var ProductQuantity = document.createElement("label");
		ProductQuantity.innerHTML = "Product Quantity: " + objProduct.Quantity;
			divProduct.appendChild(ProductQuantity);

			insertBlankLine(divProduct);

	//create a anchor for deleting this product
	var bDelete = document.createElement("button");
	bDelete.innerHTML = "Delete";
	divProduct.appendChild(bDelete);

	bDelete.addEventListener("click",function(event)
									  {
									   // To access the parent node of the element which is clicked
									   // Ist method
										  // var selectedProductIndex = getProductIndex(parseInt(divProduct.id));
										  // removeFromProductsArray(selectedProductIndex);
                                          // divProduct.parentNode.removeChild(divProduct);

									   // 2nd Method
										   var targetParent = event.target.parentNode;
										   var selectedProductIndex = getProductIndex(parseInt(targetParent.id));
										   console.log("targetParent.id "+targetParent.id);
										   removeFromProductsArray(selectedProductIndex);
										   targetParent.parentNode.removeChild(targetParent);

										storevalues();
									//	deleteNewProductPanel();
									  }
							);

	var editproduct=document.createElement("button");
	editproduct.innerHTML="Edit";
	editproduct.addEventListener("click",function(event)
	{
		hideAddNewProductLink();
		divListProducts.setAttribute("style","visibility:hidden");
		edit(objProduct,aProductName,lblProductName);
	});

	divProduct.appendChild(editproduct);

    aProductName.addEventListener("click",function(event)
									  {
											var selectedProductIndex = getProductIndex(parseInt(event.target.parentNode.id));
											getProductDetails(selectedProductIndex);
									  }
							     );

	divListProducts.appendChild(divProduct);

    insertBlankLine(divProduct);
	insertBlankLine(divProduct);

	unHideAddNewProductLink();
	productId++;
}

function edit(objProduct,aProductName,lblProductName)
{
//	deleteNewProductPanel();
	var txtProductName = document.createElement("input");
	txtProductName.setAttribute("type","text");
	txtProductName.setAttribute("id","txtProductName");
    txtProductName.value=objProduct.Name;
	txtProductName.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductName);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	var txtProductDesc = document.createElement("textarea");
	txtProductDesc.setAttribute("id","txtProductDesc");
    txtProductDesc.value=objProduct.Desc;
	txtProductDesc.setAttribute("style","width:250px ; height:50px");
	divAddProduct.appendChild(txtProductDesc);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	var txtProductPrice = document.createElement("input");
	txtProductPrice.setAttribute("type","text");
	txtProductPrice.setAttribute("id","txtProductPrice");
    txtProductPrice.value=objProduct.Price;
	txtProductPrice.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductPrice);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	var txtProductQuantity = document.createElement("input");
	txtProductQuantity.setAttribute("type","text");
	txtProductQuantity.setAttribute("id","txtProductQuantity");
    txtProductQuantity.value=objProduct.Quantity;
	txtProductQuantity.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductQuantity);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	var saveproduct=document.createElement("button");
	saveproduct.innerHTML="Save Changes";
//	saveproduct.setAttribute("id","savebtn");
	divAddProduct.appendChild(saveproduct);
	saveproduct.addEventListener("click",function(event)
	{
		editProducttoArray(objProduct,aProductName,lblProductName);
		divAddProduct.removeChild(saveproduct);
		deleteNewProductPanel();
		divListProducts.setAttribute("style","visibility:visible");
		unHideAddNewProductLink();
	});

}

function editProducttoArray(objProduct,aProductName,lblProductName)
{
	objProduct.Name = txtProductName.value;
    objProduct.Desc = txtProductDesc.value;
	objProduct.Price = txtProductPrice.value;
	objProduct.Quantity = txtProductQuantity.value;
	aProductName.innerHTML = "Product Name: " + objProduct.Name;
	lblProductName.innerHTML = "Product Desc: " + objProduct.Desc;
	storevalues();
	//products.splice(parseInt(objProduct.Id)-1,1);
	//products.splice(parseInt(NewobjProduct.productId)-1, 0, NewobjProduct);
	//editProducttoDOM();
}

function editProducttoDOM()
{
	divListProducts.innerHTML="";
	for(var i=0;i<products.length;i++)
	{
		addProducttoDOM(products[i]);
	}
}

// Given a product ID, returns the index to the product store in products.
function getProductIndex(id)
{
    for (var i = 0; i < products.length; i++)
	{
		//console.log("products[i].Id = "+products[i].Id+" id = "+id);
        if (products[i].Id == id)
		{
		//	console.log("i="+i);
			return i;
		}
    }
}

function getProductDetails(selectedProductIndex)
{
  console.log( "Name : " + products[selectedProductIndex].Name + "  Desc: " + products[selectedProductIndex].Desc +
               "   Price : " + products[selectedProductIndex].Price + "  Quantity: " + products[selectedProductIndex].Quantity);
}

function removeFromProductsArray(selectedProductIndex)
{
	console.log(selectedProductIndex);
	products.splice(selectedProductIndex,1);
	console.log(products);
}

function deleteNewProductPanel()
{
   var childNodes = divAddProduct.childNodes;
   for (var i = 0; childNodes.length > 0;)
   {
     divAddProduct.removeChild(childNodes[i]);
   }
}

function hideAddNewProductLink()
{
   aAddProduct.setAttribute("style","visibility:hidden");
}

function unHideAddNewProductLink()
{
   aAddProduct.setAttribute("style","visibility:visible");
}

function insertBlankLine(targetElement)
{
	var br = document.createElement("br");
    targetElement.appendChild(br);
}

function createNewProductPanel()
{
	hideAddNewProductLink();

	/* Label - Product Quantity */
	var lblAddProduct = document.createElement("label");
	lblAddProduct.innerHTML = "Add New Product";
	lblAddProduct.setAttribute("style","font-weight:bold");
    divAddProduct.appendChild(lblAddProduct);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	/* TextBox - Product Name */
	var txtProductName = document.createElement("input");
	txtProductName.setAttribute("type","text");
	txtProductName.setAttribute("id","txtProductName");
    txtProductName.setAttribute("placeholder", "Enter the product name");
	txtProductName.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductName);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	/* TextBox - Product Description */
	var txtProductDesc = document.createElement("textarea");
	txtProductDesc.setAttribute("id","txtProductDesc");
    txtProductDesc.setAttribute("placeholder", "Enter the product description");
	txtProductDesc.setAttribute("style","width:250px ; height:50px");
	divAddProduct.appendChild(txtProductDesc);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	/* TextBox - Product Price */
	var txtProductPrice = document.createElement("input");
	txtProductPrice.setAttribute("type","text");
	txtProductPrice.setAttribute("id","txtProductPrice");
    txtProductPrice.setAttribute("placeholder", "Enter the product price");
	txtProductPrice.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductPrice);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	/* TextBox - Product Quantity */
	var txtProductQuantity = document.createElement("input");
	txtProductQuantity.setAttribute("type","text");
	txtProductQuantity.setAttribute("id","txtProductQuantity");
    txtProductQuantity.setAttribute("placeholder", "Enter the product quantity");
	txtProductQuantity.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductQuantity);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	/* Button - Add Product */
	var btnAddButton = document.createElement("button");
	btnAddButton.setAttribute("id","btnAddButton");
	btnAddButton.innerHTML = "Add Product";
	divAddProduct.appendChild(btnAddButton);

    btnAddButton.addEventListener("click", function(event)
											{
												if(txtProductName.value=="")
												{
													alert("Product name cannot be empty");
												}
												else if(txtProductQuantity.value=="")
												{
													alert("Product Quantity cannot be empty");
												}
												else if(txtProductPrice.value=="")
												{
													alert("Product Price cannot be empty");
												}
												else
												{
													addProducttoArray();
													divListProducts.setAttribute("style","visibility:visible");
												}
											}
								 );
}

function storevalues()
{
	var product = JSON.stringify(products);
	localStorage.setItem("store",product);
}
