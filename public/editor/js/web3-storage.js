import { Web3Storage } from 'https://cdn.jsdelivr.net/npm/web3.storage@4.4.0/dist/bundle.esm.min.js'

window.upload_flow=  async function (file, apiToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZGNWRjZmY5MjI4OUU1RTlEODQ1NzNDRUY2ZGRBNTQ3MTZGQkI5MEYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mjk3ODA0MDU2NzMsIm5hbWUiOiJ0ZXN0In0.DAB4rMM6aRvb0exYPiqkKS06DyQlMkc1lWXFMBbioCQ"){
    try{
        const client = new Web3Storage({ token: apiToken });
        const rootCid = await client.put([file], {
            name: 'flow.json',
            maxRetries: 3,
          });
        return rootCid;
    }catch(e){
        console.log(e)
        throw("")
    }
}