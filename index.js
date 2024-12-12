const http=require('http')
const server = http.createServer((req,res)=>{
    if(req.url==='/' && req.method ==='POST'){
        let body='';
        req.on('data',(chunk)=>{
            body+=chunk;
        })

        req.on('end',()=>{
            try{

                const parseJSON=JSON.parse(body);
                
                console.log('RECEIVED_PAYLOAD2 : ', parseJSON);
                const skus = parseJSON.variants.map(variant => variant.sku);
                console.log("SKUR",skus);
                var name= "SKUNAME";
                console.log("Name is", name);
                res.writeHead(200,{'Content-type':'application/json'});
                res.end(JSON.stringify({message : 'Data Received Successfully'}))
                
                CreateCollection(name);

            }catch(error){


            }
        


        })


        res.write('HELLO WORLD');
        res.end();
    }



});

server.listen(4000);


function CreateCollection(name){
    console.log("Collection name", name);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-Shopify-Access-Token", "");
    
    const raw = JSON.stringify({
      "query": `mutation { collectionCreate(input: { title: \"${name}\", descriptionHtml: \"This is a description for the collection.\", handle: \"my-new-collection\", seo: { title: \"My New Collection SEO Title\", description: \"SEO description for the collection.\" }, image: { src: \"https://images.squarespace-cdn.com/content/v1/5336f9ebe4b00209e20806c1/1604069548152-VXQI49220L29NBADWQGM/logo.jpg\", altText: \"Collection Image\" } }) { collection { id title handle } userErrors { field message } } }`
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("https://custom-store-0000.myshopify.com/admin/api/2024-01/graphql.json", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}