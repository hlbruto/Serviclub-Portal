(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"17d4":function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("q-page",{staticClass:"imagenFondo",staticStyle:{"background-image":"url(images/hero.png)"}},[a("q-card",{staticClass:"q-pa-md",staticStyle:{background:"linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0)"},attrs:{flat:""}},[a("div",{staticClass:"q-gutter-y-md"},[a("q-tabs",{staticClass:"text-black",attrs:{shrink:"",stretch:"",dense:"","active-color":"primary","indicator-color":"primary","narrow-indicator":""},model:{value:t.tab,callback:function(s){t.tab=s},expression:"tab"}},[a("q-tab",{staticClass:"q-mt-lg",attrs:{name:"casa",label:"EN LA CASA",icon:"mdi-home"}}),a("q-tab",{staticClass:"q-mt-lg",attrs:{name:"red",label:"EN LA RED",icon:"mdi-wifi"}}),a("q-tab",{staticClass:"q-mt-lg",attrs:{name:"instalacion",label:"EN LA INSTALACIÓN",icon:"mdi-map-marker-radius"}})],1),a("q-tab-panels",{staticClass:"bg-transparent",attrs:{animated:"","transition-prev":"fade","transition-next":"fade"},model:{value:t.tab,callback:function(s){t.tab=s},expression:"tab"}},[a("q-tab-panel",{attrs:{name:"casa"}},[a("div",{staticClass:"row q-col-gutter-sm justify-center text-center"},t._l(t.$store.state.serviciosCasa,(function(t){return a("div",{key:t.id,staticClass:"q-mt-md"},[a("tarjetaServicio",{staticClass:"q-ml-sm q-mr-sm col-md-2 col-sm-10",attrs:{servicio:t}})],1)})),0)]),a("q-tab-panel",{attrs:{name:"red"}},[a("div",{staticClass:"row q-col-gutter-sm justify-center text-center"},t._l(t.$store.state.serviciosRed,(function(t){return a("div",{key:t.id,staticClass:"q-mt-md"},[a("tarjetaServicio",{staticClass:"q-ml-sm q-mr-sm  col-md-2 col-sm-10",attrs:{servicio:t}})],1)})),0)]),a("q-tab-panel",{attrs:{name:"instalacion"}},[a("div",{staticClass:"row q-col-gutter-sm justify-evenly text-center"},t._l(t.$store.state.serviciosJC,(function(t){return a("div",{key:t.id,staticClass:"q-mt-md"},[a("tarjetaServicio",{staticClass:"q-ml-sm q-mr-sm col-md-2 col-sm-10",attrs:{servicio:t}})],1)})),0)])],1)],1)])],1)},i=[],r=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("q-card",{staticClass:"my-card-serv shadow-10",attrs:{bordered:""}},[a("q-img",{attrs:{src:"img/servicios/"+t.servicio.foto,"lazy-src":"img/servicios/"+t.servicio.foto}}),a("q-card-section",[a("div",{staticClass:"row no-wrap items-center"},[a("div",{staticClass:"col ellipsis"},[a("strong",[t._v(t._s(t.servicio.nombre))])])]),a("div",{staticClass:"text-caption text-linea"},[t._v("$."+t._s(t.servicio.tarifa))]),a("div",{staticClass:"q-mt-md text-parrafo"},[a("small",[t._v(t._s(t.servicio.descripcion))])])]),a("q-separator"),a("q-card-actions",{attrs:{align:"center"}},[a("q-btn",{attrs:{flat:"",size:"sm",color:"primary",label:"ver más"},on:{click:function(s){return t.esteServicio(t.servicio)}}})],1)],1),a("VerServicio")],1)},o=[],c={name:"tarjetaServicio",props:["servicio"],components:{VerServicio:a("4229").default},data:function(){return{}},methods:{esteServicio:function(t){console.log("serv:"),console.log(t),this.$store.state.problema="",this.$store.state.momento="",this.$store.state.unservicio=t,this.$store.state.slideServicio=this.$store.state.unservicio.id,console.log("un serv:"),console.log(this.$store.state.unservicio),this.$store.state.dialogo.verServicio=!0}}},n=c,l=(a("cd4b"),a("2877")),m=Object(l["a"])(n,r,o,!1,null,null,null),d=m.exports,v={name:"Servicios",components:{tarjetaServicio:d},data:function(){return{tab:"casa"}},created:function(){},methods:{}},u=v,b=Object(l["a"])(u,e,i,!1,null,null,null);s["default"]=b.exports},"338f":function(t,s,a){},cd4b:function(t,s,a){"use strict";a("338f")}}]);