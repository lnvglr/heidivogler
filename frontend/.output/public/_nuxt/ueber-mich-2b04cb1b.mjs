import{_ as p,d as l,r as t,o as s,g as u,f as d,h as o,w as m,q as h,a as n,I as C,H as b,C as f,c as g}from"./entry-8c113b20.mjs";const _=l({setup(){},components:{Image:C,HeroCopy:b,ContentCollection:f},data(){return{page:null,show:!1}},methods:{},async mounted(){setTimeout(()=>{this.show=!0},500),this.page=(await this.$strapi.find("about")).data}}),y={key:0},w={class:"h-[90vh] min-h-[720px] relative"};function v(e,k,$,B,H,I){var a;const r=t("Image"),i=t("HeroCopy"),c=t("ContentCollection");return e.page?(s(),u("div",y,[d("div",w,[o(r,{media:(a=e.page.attributes.hero.image)==null?void 0:a.data.attributes,class:"h-full -mt-36 -z-10 object-top",width:"full",aspectRatio:"16/10"},null,8,["media"]),o(h,{name:"slide-in"},{default:m(()=>[e.show?(s(),g(i,{key:0,copy:e.page.attributes.hero.copy,subCopy:e.page.attributes.hero.subCopy,class:"absolute bottom-0 p-24 w-full bg-gradient-to-t z-20"},null,8,["copy","subCopy"])):n("",!0)]),_:1})]),o(c,{content:e.page.attributes.content},null,8,["content"])])):n("",!0)}var V=p(_,[["render",v]]);export{V as default};
