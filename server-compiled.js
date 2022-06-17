(()=>{var e={860:e=>{"use strict";e.exports=require("express")},470:e=>{"use strict";e.exports=require("fs-extra")},13:e=>{"use strict";e.exports=require("mongodb")},738:e=>{"use strict";e.exports=require("multer")},109:e=>{"use strict";e.exports=require("sanitize-html")},441:e=>{"use strict";e.exports=require("sharp")},17:e=>{"use strict";e.exports=require("path")}},t={};function s(o){var i=t[o];if(void 0!==i)return i.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,s),n.exports}(()=>{const{MongoClient:e,ObjectId:t}=s(13),o=s(860),i=s(738)(),n=s(109),a=s(470),r=s(441);let c;const l=s(17);a.ensureDirSync(l.join("public","uploaded-photos"));const d=o();d.set("view engine","ejs"),d.set("views","./views"),d.use(o.static("public")),d.use(o.json()),d.use(o.urlencoded({extended:!1})),d.get("/",(async(e,t)=>{const s=await c.collection("animals").find().toArray();t.render("home",{allAnimals:s})})),d.use((function(e,t,s){t.set("WWW-Authenticate","Basic realm='Our MERN App'"),"Basic YWRtaW46YWRtaW4="==e.headers.authorization?s():(console.log(e.headers.authorization),t.status(401).send("Try again"))})),d.get("/admin",((e,t)=>{t.render("admin")})),d.get("/api/animals",(async(e,t)=>{const s=await c.collection("animals").find().toArray();t.json(s)})),d.post("/create-animal",i.single("photo"),(function(e,t,s){"string"!=typeof e.body.name&&(e.body.name=""),"string"!=typeof e.body.species&&(e.body.species=""),"string"!=typeof e.body._id&&(e.body._id=""),e.cleanData={name:n(e.body.name.trim(),{allowedTags:[],allowedAttributes:{}}),species:n(e.body.species.trim(),{allowedTags:[],allowedAttributes:{}})},s()}),(async(e,s)=>{if(e.file){const t=`${Date.now()}.jpg`;await r(e.file.buffer).resize(844,456).jpeg({quality:60}).toFile(l.join("public","uploaded-photos",t)),e.cleanData.photo=t}console.log(e.body);const o=await c.collection("animals").insertOne(e.cleanData);console.log(o.insertedId),console.log(e.cleanData);const i=await c.collection("animals").findOne({_id:new t(o.insertedId)});s.send(i)})),async function(){const t=new e("mongodb://localhost:27017/AmazingMernApp?&authSource=admin");await t.connect(),c=t.db(),d.listen(3e3)}()})()})();