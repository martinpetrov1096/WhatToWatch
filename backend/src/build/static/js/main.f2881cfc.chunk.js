(this["webpackJsonpwhat-to-watch"]=this["webpackJsonpwhat-to-watch"]||[]).push([[0],{132:function(n,e,t){},133:function(n,e,t){"use strict";t.r(e);var r=t(0),i=t(1),c=t.n(i),o=t(65),a=t.n(o),u=t(12),s=t(4),l=t(7),d=t(32),b=t(18),f=t.n(b),j=t(5),p=t(33),x=t(2),h=t(3);function v(){var n=Object(x.a)(["\n   margin: 0;\n   padding: 10px;\n"]);return v=function(){return n},n}function O(){var n=Object(x.a)(["\n   pointer-events: none !important;\n   border: none !important;\n   background-color: ","};\n"]);return O=function(){return n},n}function g(){var n=Object(x.a)(["\n   transition: ",";\n   padding: 10px;\n   background: transparent;\n   box-shadow: none;\n   outline: none;\n   border: 1px solid white;\n   border-radius: 10px;\n   color: white;\n   font-size: 22px;\n   margin: 15px;\n   &:hover {\n      color: "," !important;\n      border-color: "," !important;\n   }\n"]);return g=function(){return n},n}var m="#3B406B",w="#2B2F54",y="#FF616F",k="all .15s ease-in-out",C=h.b.button(g(),k,y,y),S=Object(h.b)(C)(O(),y),I=h.b.div(v());function z(){var n=Object(x.a)(["\n   padding: 10px;\n   border-radius: 5px;\n\n   font-size: 14px;\n   transition: ",";\n\n   :hover {\n      background-color: ",";\n   }\n"]);return z=function(){return n},n}function M(){var n=Object(x.a)(["\n   visibility: hidden;\n   :checked + label {\n      background-color: ",";\n      box-shadow: inset 2px 2px 2px #191B30;\n   }\n"]);return M=function(){return n},n}function _(){var n=Object(x.a)(["\n   margin-top: 30px;\n\n   flex-basis: 80px;\n   flex-grow: 1;\n   white-space: nowrap;\n"]);return _=function(){return n},n}function R(){var n=Object(x.a)(["\n   width: 100%;\n   text-align: center;\n   font-size: 30px;\n"]);return R=function(){return n},n}function D(){var n=Object(x.a)(["\n   margin-bottom: 30px;\n\n   max-width: 500px;\n   height: 100%;\n   display: flex;\n   flex-flow: row wrap;\n   justify-content: center;\n   align-content: space-around;\n"]);return D=function(){return n},n}var G=h.b.div(D()),E=h.b.h3(R()),L=h.b.div(_()),T=h.b.input(M(),w),F=h.b.label(z(),k,w),N=function(n){var e=p[n.type].map((function(e){return Object(r.jsxs)(L,{children:[Object(r.jsx)(T,{type:"checkbox",name:e.name,value:e.id,id:e.name,checked:n.curGenres.includes(e.id),onChange:function(){return n.curGenres.includes(e.id)?n.delGenre(e.id):n.addGenre(e.id)}}),Object(r.jsx)(F,{htmlFor:e.name,children:e.name})]},e.id)}));return Object(r.jsxs)(G,{children:[Object(r.jsx)(E,{children:"Genres"}),e]})};function U(){var n=Object(x.a)(["\n   border: none;\n   border-radius: 8px;\n   box-shadow: inset 2px 2px 2px #191B30;\n   outline: none;\n   width: 40px;\n   height: 40px;\n   background-color: ",";\n   text-align: center;\n   color: white;\n   font-family: 'Varela', sans-serif;\n   \n   ::-webkit-outer-spin-button,\n   ::-webkit-inner-spin-button {\n      -webkit-appearance: none;\n      margin: 0;\n   }\n   -moz-appearance: textfield // Firefox\n"]);return U=function(){return n},n}function B(){var n=Object(x.a)(["\n   width: 40px;\n   height: 40px;\n   padding: 0;\n   text-align: center;\n"]);return B=function(){return n},n}function V(){var n=Object(x.a)(["\n   display: flex;\n   flex-flow: row nowrap;\n   align-items: center;\n"]);return V=function(){return n},n}function W(){var n=Object(x.a)(["\n   font-size: 30px;\n"]);return W=function(){return n},n}function A(){var n=Object(x.a)(["\n   margin-bottom: 30px;\n   display: flex;\n   flex-flow: column nowrap;\n   align-items: center;\n"]);return A=function(){return n},n}var J=h.b.div(A()),q=h.b.h3(W()),H=h.b.div(V()),X=Object(h.b)(C)(B()),Y=h.b.input(U(),w),P=function(n){var e=Object(i.useCallback)((function(e){n.changeMinRating(parseInt(e.target.value))}),[n]);return Object(r.jsxs)(J,{children:[Object(r.jsx)(q,{children:"Minimum Rating"}),Object(r.jsxs)(H,{children:[Object(r.jsx)(X,{onClick:function(){return n.changeMinRating(n.curMinRating-1)},children:"-"}),Object(r.jsx)(Y,{type:"number",value:n.curMinRating,onChange:e,min:"0",max:"9"}),Object(r.jsx)(X,{onClick:function(){return n.changeMinRating(n.curMinRating+1)},children:"+"})]})]})};function K(){var n=Object(x.a)(["\n   align-self: center;\n"]);return K=function(){return n},n}function Q(){var n=Object(x.a)(["\n   margin: 20px min(10px, 1vw);\n   border-radius: 8px;\n   padding: 20px;\n   background-color: ",";\n   box-shadow: inset 2px 2px 2px #191B30;\n"]);return Q=function(){return n},n}function Z(){var n=Object(x.a)(["\n   margin-bottom: 30px;\n   display: flex;\n   flex-flow: row nowrap;\n"]);return Z=function(){return n},n}var $=h.b.div(Z()),nn=h.b.h2(Q(),w),en=(Object(h.b)(S)(K()),function(n){return Object(r.jsxs)($,{children:[Object(r.jsx)(nn,{children:n.lobbyId[0]}),Object(r.jsx)(nn,{children:n.lobbyId[1]}),Object(r.jsx)(nn,{children:n.lobbyId[2]}),Object(r.jsx)(nn,{children:n.lobbyId[3]}),Object(r.jsx)(nn,{children:n.lobbyId[4]})]})}),tn=t(72);function rn(){var n=Object(x.a)(["\n   margin: 0 10px;\n   font-size: 18px;\n   text-align: center;\n"]);return rn=function(){return n},n}function cn(){var n=Object(x.a)(["\n   margin-bottom: 30px;\n   display: flex;\n   flex-flow: row nowrap;\n   align-items: center;\n"]);return cn=function(){return n},n}var on=h.b.div(cn()),an=h.b.h3(rn()),un=t(69),sn=t.n(un),ln={checkedIcon:!1,uncheckedIcon:!1,offColor:w,onColor:w,offHandleColor:y,onHandleColor:y,height:22,handleDiameter:26},dn=function(n){return Object(r.jsxs)(on,{children:[Object(r.jsx)(an,{children:"MOVIE"}),Object(r.jsx)(sn.a,Object(tn.a)({checked:"tv"===n.type,onChange:function(e){return e?n.setType("tv"):n.setType("movie")}},ln)),Object(r.jsx)(an,{children:"TV SHOW"})]})};function bn(){var n=Object(x.a)(["\n   margin: 20px 0;\n   font-size: max(5vw, 30px);\n"]);return bn=function(){return n},n}function fn(){var n=Object(x.a)(["\n   display: flex;\n   flex-flow: column nowrap;\n   justify-content: flex-start;\n   align-items: center;\n   height: auto;\n"]);return fn=function(){return n},n}var jn,pn=Object(h.b)(I)(fn()),xn=h.b.h1(bn()),hn=function(){var n=Object(s.h)().lobbyId,e=Object(s.f)(),t=Object(i.useState)({id:n,playing:!1,numPlayers:1,type:"movie",genres:[],minRating:1}),c=Object(l.a)(t,2),o=c[0],a=c[1];Object(i.useEffect)((function(){return(jn=Object(d.io)(j.server.url+"lobby",{query:{gameId:n}})).on("update",(function(n){console.log("updating"),a((function(e){return JSON.parse(JSON.stringify(n))}))})),jn.on("error",(function(n){switch(console.log(n),n){case"game has already started":jn.disconnect()}})),function(){console.log("lobby cleanup"),jn.disconnect()}}),[n]),Object(i.useEffect)((function(){f.a.get(j.server.url+"game/",{params:{id:n}}).then((function(n){"Lobby"!==n.data.Status&&(e.push("/error"),jn.disconnect())})).catch((function(){e.push("/error"),jn.disconnect()}))}),[n,e]),Object(i.useEffect)((function(){o.playing&&(jn.disconnect(),e.push("/game/"+n+"/vote"))}),[o,e,n]);var u=Object(i.useCallback)((function(){jn.emit("start")}),[]),b=Object(i.useCallback)((function(n){jn.emit("changeType",n)}),[]),p=Object(i.useCallback)((function(n){jn.emit("addGenre",n),console.log("adding genre")}),[]),x=Object(i.useCallback)((function(n){jn.emit("delGenre",n),console.log("deleting genre")}),[]),h=Object(i.useCallback)((function(n){jn.emit("changeMinRating",n),console.log("changing minimum rating")}),[]);return Object(r.jsxs)(pn,{children:[Object(r.jsx)(xn,{children:"What-To-Watch"}),Object(r.jsx)(en,{lobbyId:n}),Object(r.jsx)(dn,{type:o.type,setType:b}),Object(r.jsx)(P,{curMinRating:o.minRating,changeMinRating:h}),Object(r.jsx)(N,{type:o.type,addGenre:p,delGenre:x,curGenres:o.genres}),Object(r.jsx)(C,{onClick:u,children:"START"})]})},vn=t(71);function On(){var n=Object(x.a)(["\n\n"]);return On=function(){return n},n}function gn(){var n=Object(x.a)(["\n   align-self: center;\n   padding: 30px 0 10px 0;\n   display: flex;\n   flex-basis: 800px;\n   flex-flow: row nowrap;\n   align-items: center;\n   justify-content: center;\n   > h6 {\n      flex-basis: 400px;\n      flex-shrink: 1;\n      flex-grow: 0;\n      text-align: center;\n      text-decoration: none;\n      font-size: 20px;\n   }\n   > * { // Needed since styled-components created a div\n      &:first-child {\n         color: "," !important;\n      }\n      &:nth-child(2) {\n            color: "," !important;\n         }\n   }\n"]);return gn=function(){return n},n}var mn=h.b.nav(gn(),(function(n){return n.onVoteView?y:"white"}),(function(n){return n.onVoteView?"white":y})),wn=(h.b.a(On()),function(){var n=Object(s.f)(),e=Object(s.g)(),t=Object(i.useState)(e.pathname.includes("vote")),c=Object(l.a)(t,2),o=c[0],a=c[1],u=Object(i.useCallback)((function(e){n.push(e),a("vote"===e)}),[n]);return Object(r.jsxs)(mn,{onVoteView:o,children:[Object(r.jsx)("h6",{onClick:function(){return u("vote")},children:"Vote"}),Object(r.jsx)("h6",{onClick:function(){return u("overview")},children:"Overview"})]})});function yn(){var n=Object(x.a)(['\n   padding-bottom: min(100%, 60vh);\n   border-radius: 5%;\n   width: 66.6%;\n   max-width: 450px;\n\n   background-image: url("','");\n   background-position: center;\n   background-size: cover;\n   box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);\n\n   transition: all 1s ease-in-out;\n']);return yn=function(){return n},n}var kn=h.b.div(yn(),(function(n){return n.posterUrl}));function Cn(){var n=Object(x.a)([""," 2s linear infinite"]);return Cn=function(){return n},n}function Sn(){var n=Object(x.a)(["\n   stroke: ",";\n   stroke-dasharray: 89, 200;\n   stroke-dashoffset: 10;\n   animation: ",";\n   stroke-linecap: round;\n"]);return Sn=function(){return n},n}function In(){var n=Object(x.a)([""," 2s linear infinite"]);return In=function(){return n},n}function zn(){var n=Object(x.a)(["\n   position: absolute;\n   top: 0;\n   bottom: 0;\n   left: 0;\n   right: 0;\n   margin: auto;\n   height: 100%;\n   width: 100%;\n   max-width: 75px;\n   max-height: 75px;\n   animation: ",";\n   transform-origin: center center;\n"]);return zn=function(){return n},n}function Mn(){var n=Object(x.a)(["\n   0% {\n      stroke-dasharray: 1, 200;\n      stroke-dashoffset: 0;\n   }\n   50% {\n      stroke-dasharray: 89, 200;\n      stroke-dashoffset: -35px;\n   }\n   100% {\n      stroke-dasharray: 89, 200;\n      stroke-dashoffset: -124px;\n   }\n"]);return Mn=function(){return n},n}function _n(){var n=Object(x.a)(["\n   100% {\n      transform: rotate(360deg);\n   }\n"]);return _n=function(){return n},n}var Rn=h.b.svg(zn(),Object(h.a)(In(),Object(h.c)(_n()))),Dn=h.b.circle(Sn(),y,Object(h.a)(Cn(),Object(h.c)(Mn()))),Gn=function(){return Object(r.jsx)(Rn,{viewBox:"25 25 50 50",children:Object(r.jsx)(Dn,{cx:"50",cy:"50",r:"20",fill:"none","stroke-width":"2","stroke-miterlimit":"10"})})},En=function(n){var e=Object(s.h)().gameId,t=Object(s.f)(),c=Object(i.useCallback)((function(){n.card&&t.push("/game/"+e+"/details/"+n.card.id)}),[n.card,e,t]);return void 0===n.card?Object(r.jsx)(Gn,{}):Object(r.jsx)(kn,{posterUrl:(j.movieDb.posterUrl+n.card.poster_path).toString(),onClick:c},n.card.id)};function Ln(){var n=Object(x.a)(['\n   background-image: url("/assets/like-btn.svg");\n']);return Ln=function(){return n},n}function Tn(){var n=Object(x.a)(['\n   background-image: url("/assets/dislike-btn.svg");\n']);return Tn=function(){return n},n}function Fn(){var n=Object(x.a)(["\n   width: 100%;\n   height: 100%;\n   box-shadow: none;\n   border: none;\n   border-radius: 100%;\n   outline: none;\n   background-repeat: no-repeat;\n   background-position: center;\n   background-color: transparent;\n"]);return Fn=function(){return n},n}function Nn(){var n=Object(x.a)(["\n   flex-basis: 100px;\n   flex-shrink: 1;\n   width: min(500px, 100%);\n   display: flex;\n   flex-flow: row nowrap;\n   justify-content: space-around;\n"]);return Nn=function(){return n},n}function Un(){var n=Object(x.a)([""," .75s ease-in-out"]);return Un=function(){return n},n}function Bn(){var n=Object(x.a)([""," .75s ease-in-out"]);return Bn=function(){return n},n}function Vn(){var n=Object(x.a)(["\n   flex-basis: 400px;\n   flex-shrink: 2;\n   display: flex;\n   justify-content: center;\n   align-items: center;\n   width: min(500px, 100%);\n   animation: ",";\n"]);return Vn=function(){return n},n}function Wn(){var n=Object(x.a)(["\n   50% {\n      transform: translateX(-400px) rotate(-45deg) rotateY(90deg);\n   }\n   to {\n      transform: translateX(0) rotateY(360deg);\n   }\n"]);return Wn=function(){return n},n}function An(){var n=Object(x.a)(["\n50% {\n   transform: translateX(400px) rotate(45deg) rotateY(90deg);\n}\nto {\n   transform: translateX(0) rotateY(360deg);\n}\n"]);return An=function(){return n},n}function Jn(){var n=Object(x.a)(["\n   // Account for 60px nav and 20px padding\n   height: calc(100vh - 80px); \n   width: calc(100% - 20px); \n   display: flex;\n   flex-flow: column nowrap;\n   justify-content: space-around;\n   align-items: center;\n"]);return Jn=function(){return n},n}var qn=Object(h.b)(I)(Jn()),Hn=h.b.div(Vn(),(function(n){return void 0!==n.vote?"yes"===n.vote?Object(h.a)(Bn(),Object(h.c)(An())):Object(h.a)(Un(),Object(h.c)(Wn())):"none"})),Xn=h.b.div(Nn()),Yn=h.b.button(Fn()),Pn=Object(h.b)(Yn)(Tn()),Kn=Object(h.b)(Yn)(Ln()),Qn=function(n){var e=Object(i.useState)(Object(r.jsx)("h1",{children:"Loading . . . "})),t=Object(l.a)(e,2),c=t[0],o=t[1],a=Object(i.useState)(void 0),u=Object(l.a)(a,2),s=u[0],d=u[1],b=Object(i.useCallback)((function(e){void 0!==n.curSwipe&&(n.curSwipe.vote||(d(e),setTimeout((function(){n.vote(e)}),363),setTimeout((function(){d(void 0)}),750)))}),[n]);return Object(i.useEffect)((function(){-99===n.swipeIdx?o(Object(r.jsx)(qn,{children:Object(r.jsx)("h1",{children:"No Swipes Left"})})):o(Object(r.jsxs)(qn,{children:[Object(r.jsx)(Hn,{vote:s,children:Object(r.jsx)(En,{card:n.curSwipe})}),Object(r.jsxs)(Xn,{children:[Object(r.jsx)(Pn,{onClick:function(){return s?function(){}:b("no")}}),Object(r.jsx)(Kn,{onClick:function(){return s?function(){}:b("yes")}})]})]}))}),[n,s,b]),c},Zn=t(19);function $n(){var n=Object(x.a)(["\n   width: 50px;\n   height: 50px;\n   background-image: url('","');\n   background-repeat: no-repeat;\n"]);return $n=function(){return n},n}function ne(){var n=Object(x.a)(["\n   width: 50px !important;\n   height: 50px;\n"]);return ne=function(){return n},n}function ee(){var n=Object(x.a)(["\n   padding-top: 20px;\n   width: min(500px, 100%);\n   display: flex;\n   flex-flow: row nowrap;\n   justify-content: center;\n   align-items: center;\n\n   > * {\n      flex-basis: 80px;\n   }\n"]);return ee=function(){return n},n}function te(){var n=Object(x.a)(["\n   width: 90%;\n   max-width: 500px;\n   height: auto;\n   display: flex;\n   flex-flow: column nowrap;\n   align-items: center;\n   justify-content: space-around;\n   padding: 40px 0;\n"]);return te=function(){return n},n}function re(){var n=Object(x.a)(["\n   width: 100%;\n   display: flex;\n   flex-flow: row wrap;\n   justify-content: center;\n"]);return re=function(){return n},n}var ie=h.b.div(re()),ce=h.b.div(te()),oe=h.b.div(ee()),ae=Object(h.b)(Zn.a)(ne()),ue=h.b.div($n(),(function(n){return"no"===n.vote?"https://cdn.glitch.com/f885813f-4542-461e-9e2c-c21e4f424ee4%2FrejectButton.e604d513.svg?v=1591586148426":"https://cdn.glitch.com/f885813f-4542-461e-9e2c-c21e4f424ee4%2FheartButton.1f05d0b6.svg?v=1591586129623"})),se=(t(129),function(n){return Object(r.jsx)(ie,{children:n.swipes.sort((function(n,e){return e.numLikes/(e.numLikes+e.numDislikes)-n.numLikes/(n.numLikes+n.numDislikes)})).map((function(n){return Object(r.jsxs)(ce,{children:[Object(r.jsx)(En,{card:n},n.id),Object(r.jsxs)(oe,{children:[Object(r.jsx)(ae,{value:100*n.numLikes/(n.numLikes+n.numDislikes),text:n.numLikes.toString()+"/"+(n.numLikes+n.numDislikes).toString(),strokeWidth:20,styles:Object(Zn.b)({strokeLinecap:"butt",pathColor:y,trailColor:w})}),Object(r.jsx)(ue,{vote:n.vote})]})]},n.id)}))})});function le(){var n=Object(x.a)(["\n   flex: 1 1 500px;\n   max-width: 700px;\n   margin: 30px 0;\n   box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\n   border-radius: 10px;\n   padding: 40px;\n   background-color: ",";\n\n   > blockquote {\n      font-size: 13px;\n      max-height: 175px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      line-height: 1.5;\n         word-break: break-all;\n   }\n\n   > h6 {\n   //   padding-top: 5px;\n      font-size: 13px;\n   }\n   @media only screen and (min-width: 900px) {\n      margin: 30px 30px;\n   }\n"]);return le=function(){return n},n}function de(){var n=Object(x.a)(["\n   align-self: center;\n\n   display: flex;\n   flex-flow: row wrap;\n   justify-content: center;\n\n   > h2 {\n      flex-basis: 100%;\n      font-size: 50px;\n   }\n\n"]);return de=function(){return n},n}function be(){var n=Object(x.a)(["\n   margin: 10px;\n   border-radius: 10px;\n   width: 138px;\n   height: 100%;\n   box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\n   background-color: ",";\n   display: flex;\n   flex-flow: column nowrap;\n   justify-content: flex-start;\n\n   > img {\n      border-top-left-radius: 10px;\n      border-top-right-radius: 10px;\n   }\n\n   > div {\n      flex-basis: 20px;\n      padding-top: 15px;\n      width: 100%;\n      text-align: center;\n      overflow-wrap: anywhere;\n      \n      > h3 {\n         font-size: 14px;\n      }\n      > h4 {\n         padding-top: 10px;\n         font-size: 13px;\n      }\n   }   \n"]);return be=function(){return n},n}function fe(){var n=Object(x.a)(["\n   flex-basis: 100%;\n   flex-grow: 1;\n   height: 275px;\n   display: flex;\n   flex-flow: column wrap;\n   overflow-x: scroll;\n"]);return fe=function(){return n},n}function je(){var n=Object(x.a)(["\n   align-self: center;\n   width: 95%;\n\n   display: flex;\n   flex-flow: column nowrap;\n   justify-content: center;\n\n   > div {\n      padding: 30px 0;\n   }\n"]);return je=function(){return n},n}var pe=h.b.div(je()),xe=h.b.div(fe()),he=h.b.div(be(),w),ve=h.b.div(de()),Oe=h.b.div(le(),w),ge=function(n){var e=Object(i.useState)(void 0),t=Object(l.a)(e,2),c=t[0],o=t[1];Object(i.useEffect)((function(){f.a.get(j.server.url+j.server.details,{params:{id:n.cardId,type:n.type}}).then((function(n){200===n.status&&o(n.data)}))}),[n.cardId,n.type]);var a=Object(i.useMemo)((function(){return(null===c||void 0===c?void 0:c.credits)?c.credits.cast.slice(0,10):[]}),[c]),u=Object(i.useMemo)((function(){return(null===c||void 0===c?void 0:c.reviews)?c.reviews.results.slice(0,10):[]}),[c]);return void 0!==c?Object(r.jsxs)(pe,{children:[Object(r.jsx)(xe,{children:a.map((function(n){return Object(r.jsxs)(he,{children:[Object(r.jsx)("img",{src:j.movieDb.profileUrl+n.profile_path,alt:n.name}),Object(r.jsxs)("div",{children:[Object(r.jsx)("h3",{children:n.name}),Object(r.jsx)("h4",{children:n.character})]})]})}))}),Object(r.jsxs)(ve,{children:[Object(r.jsx)("h2",{children:"Reviews"}),u.map((function(n){return Object(r.jsxs)(Oe,{children:[Object(r.jsx)("blockquote",{cite:n.url,children:n.content}),Object(r.jsxs)("h6",{children:["-",n.author]})]})}))]})]}):Object(r.jsx)(Gn,{})};function me(){var n=Object(x.a)(["\n   height: 50px;\n"]);return me=function(){return n},n}function we(){var n=Object(x.a)(["\n   flex-shrink: 0;\n   flex-basis: 80px !important;\n\n   > h5 {\n      margin-top: 10px;\n      font-size: 12px;\n      text-align: center;\n   }\n"]);return we=function(){return n},n}function ye(){var n=Object(x.a)(["\n   padding: 30px;\n   font-size: 14px;\n   line-height: 1.2\n"]);return ye=function(){return n},n}function ke(){var n=Object(x.a)(["\n   width: 100%;\n   display: flex;\n   flex-flow: row nowrap;\n   justify-content: space-around;\n   align-items: center;\n   @media (max-width: 500px) {\n      flex-flow: column;\n      justify-content: space-around;\n      align-items: space-around;\n   }\n"]);return ke=function(){return n},n}function Ce(){var n=Object(x.a)(["\n   margin: 5px;\n   border-radius: 5px;\n   padding: 10px;\n   background-color: ",";\n\n"]);return Ce=function(){return n},n}function Se(){var n=Object(x.a)(["\n   display: flex;\n   flex-flow: row wrap;\n"]);return Se=function(){return n},n}function Ie(){var n=Object(x.a)(["\n   font-size: max(3vw, 30px);\n   text-align: center;\n"]);return Ie=function(){return n},n}function ze(){var n=Object(x.a)(["\n   flex-grow: 1;\n   flex-shrink: 2;\n   padding: min(5%, 70px);\n   display: flex;\n   flex-flow: column nowrap;\n   align-items: flex-start;\n   > * {\n      padding-top: 20px;\n   }\n"]);return ze=function(){return n},n}function Me(){var n=Object(x.a)(['\n   display: none;\n   flex-basis: 40%;\n   flex-grow: 1;\n   flex-shrink: 1;\n   border-radius: 30px 0 0 30px;\n   background-image: url("','") ;\n   background-position: center;\n   background-size: contain;\n\n   @media only screen and (max-width: 900px) {\n      display: none;\n   }\n']);return Me=function(){return n},n}function _e(){var n=Object(x.a)(["\n   margin: 300px 0;\n   box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);\n   border-radius: 30px;\n   width: min(1500px, 100%);\n   background-color: ",";\n\n   display: flex;\n   flex-flow: row nowrap;\n"]);return _e=function(){return n},n}function Re(){var n=Object(x.a)(["\n   position: relative;\n   z-index: 10;\n   align-self: flex-start;\n\n"]);return Re=function(){return n},n}function De(){var n=Object(x.a)(["\n   backdrop-filter: blur(8px);\n   background-color: transparent;\n   position: relative;\n   z-index: 10;\n   display: flex;\n   flex-flow: column nowrap;\n   align-items: center;\n"]);return De=function(){return n},n}function Ge(){var n=Object(x.a)(["\n   height: 100%;\n   width: 100%;\n\n   &:before {\n      content: '';\n      z-index: 1;\n      position: fixed;\n      height: 100vh;\n      width: 100vw;\n      background-image: linear-gradient(rgba(59, 64, 107, .2), rgba(59, 64, 107, .9)), url('","');\n      background-repeat: no-repeat;\n      background-position: center;\n      background-size: cover;\n   }\n"]);return Ge=function(){return n},n}var Ee=h.b.div(Ge(),(function(n){return n.bgUrl})),Le=h.b.div(De()),Te=Object(h.b)(C)(Re()),Fe=h.b.div(_e(),m),Ne=h.b.div(Me(),(function(n){return n.posterUrl})),Ue=h.b.div(ze()),Be=h.b.h2(Ie()),Ve=h.b.div(Se()),We=h.b.h4(Ce(),w),Ae=h.b.div(ke()),Je=h.b.p(ye()),qe=h.b.div(we()),He=Object(h.b)(Zn.a)(me()),Xe=function(n){var e,t=Object(s.h)().cardId,c=Object(s.f)(),o=Object(i.useMemo)((function(){return n.cards.find((function(n){return n.id===parseInt(t)}))}),[t,n.cards]),a=Object(i.useMemo)((function(){return(null===o||void 0===o?void 0:o.original_title)?"movie":(null===o||void 0===o?void 0:o.original_name)?"tv":void 0}),[o]),u=Object(i.useState)([]),d=Object(l.a)(u,2),b=d[0],f=d[1];Object(i.useEffect)((function(){if(void 0===(null===o||void 0===o?void 0:o.genre_ids))f([]);else{var n=null===o||void 0===o?void 0:o.genre_ids.map((function(n){var e;return(null===(e=p[a||"movie"].find((function(e){return e.id===n})))||void 0===e?void 0:e.name)||""}));f(n)}}),[a,null===o||void 0===o?void 0:o.genre_ids]);var x=Object(i.useMemo)((function(){return o&&o.backdrop_path?j.movieDb.bgUrl+o.backdrop_path:(c.push("/error"),"")}),[o,c]),h=Object(i.useMemo)((function(){return o&&o.poster_path?j.movieDb.posterUrl+o.poster_path:(c.push("/error"),"")}),[o,c]);return Object(i.useEffect)((function(){void 0===o&&(console.log(o),c.push("/error"))}),[o,c]),Object(r.jsx)(Ee,{bgUrl:x,children:Object(r.jsxs)(Le,{children:[Object(r.jsx)(Te,{onClick:function(){return c.goBack()},children:"Go Back"}),Object(r.jsxs)(Fe,{children:[Object(r.jsx)(Ne,{posterUrl:h}),Object(r.jsxs)(Ue,{children:[Object(r.jsx)(Be,{children:null===o||void 0===o?void 0:o.title}),Object(r.jsx)(Ve,{children:b.map((function(n){return Object(r.jsx)(We,{children:n})}))}),Object(r.jsxs)(Ae,{children:[Object(r.jsxs)(qe,{children:[Object(r.jsx)(He,{value:10*((null===o||void 0===o?void 0:o.vote_average)||0),text:null===o||void 0===o||null===(e=o.vote_average)||void 0===e?void 0:e.toString(),strokeWidth:20,styles:Object(Zn.b)({strokeLinecap:"butt",pathColor:y,trailColor:w})}),Object(r.jsx)("h5",{children:"User Vote"})]}),Object(r.jsx)(Je,{children:null===o||void 0===o?void 0:o.overview})]}),Object(r.jsx)(ge,{cardId:t,type:a})]})]})]})})};function Ye(){var n=Object(x.a)(["\n   font-size: 25px;\n   text-align: center;\n"]);return Ye=function(){return n},n}function Pe(){var n=Object(x.a)(["\n   font-size: 50px;\n   text-align: center;\n   margin-bottom: 30px;\n"]);return Pe=function(){return n},n}function Ke(){var n=Object(x.a)(["\n   color: ",";\n"]);return Ke=function(){return n},n}function Qe(){var n=Object(x.a)(["\n   width: 95%;   \n   height: 100%;\n\n   display: flex;\n   flex-flow: column nowrap;\n   justify-content: center;\n   align-items: center;\n"]);return Qe=function(){return n},n}var Ze,$e=h.b.div(Qe()),nt=h.b.span(Ke(),y),et=h.b.h1(Pe()),tt=h.b.h3(Ye()),rt=function(n){var e=Object(s.f)(),t=Object(i.useCallback)((function(){e.push("/")}),[e]);return Object(r.jsxs)($e,{children:[Object(r.jsx)(et,{children:n.apology}),Object(r.jsxs)(tt,{children:["Click ",Object(r.jsx)(nt,{onClick:function(){return t()},children:"here"})," to go to the home page"]})]})},it=function(){var n=Object(s.h)().gameId,e=Object(i.useState)(0),t=Object(l.a)(e,2),c=(t[0],t[1]),o=Object(i.useState)([]),a=Object(l.a)(o,2),u=a[0],b=a[1],p=Object(i.useState)(0),x=Object(l.a)(p,2),h=x[0],v=x[1],O=Object(s.f)();Object(i.useEffect)((function(){f.a.get(j.server.url+"game",{params:{id:n}}).then((function(n){"Game"!==n.data.Status&&(O.push("/error"),Ze.disconnect())})).catch((function(){O.push("/error"),Ze.disconnect()}))}),[n,O]),Object(i.useEffect)((function(){return(Ze=Object(d.io)(j.server.url+"game",{query:{gameId:n}})).on("newSwipes",(function(n){console.log("Got new swipes"),b((function(e){return e.concat.apply(e,Object(vn.a)(n))}))})),Ze.on("noNewSwipes",(function(){console.log("No new swipes left"),v((function(n){return-1===n?-99:n}))})),Ze.on("newConn",(function(n){console.log("A new player joined"),c(n)})),Ze.on("newDisconn",(function(n){console.log("A player left"),c(n)})),Ze.on("connection",(function(n){console.log("Connected"),c(n.numPlayers),0===n.swipes.length&&v(-99),b(n.swipes)})),Ze.on("voted",(function(n){var e=n.swipeId,t=n.vote;b((function(n){var r=n.findIndex((function(n){return n.id===e}));if(-1===r)return n;var i=JSON.parse(JSON.stringify(n));return"yes"===t?++i[r].numLikes:++i[r].numDislikes,i}))})),Ze.on("error",(function(n){console.log(n)})),function(){console.log("game cleanup"),Ze.disconnect()}}),[n]),Object(i.useEffect)((function(){-1===h&&v(u.findIndex((function(n){return void 0===n.vote})))}),[u,h]);var g=Object(i.useCallback)((function(e){"yes"===e?(Ze.emit("vote",{gameId:n,swipeId:u[h].id,vote:"yes"}),u[h].vote="yes"):(Ze.emit("vote",{gameId:n,swipeId:u[h].id,vote:"no"}),u[h].vote="no");var t=u.findIndex((function(n){return void 0===n.vote}));-1===t&&(Ze.emit("genNewSwipes"),console.log("getting new swipes")),v(t)}),[u,n,h]);return Object(r.jsxs)(s.c,{children:[Object(r.jsxs)(s.a,{exact:!0,path:"/game/:gameId/vote",children:[Object(r.jsx)(wn,{}),Object(r.jsx)(Qn,{vote:g,curSwipe:u[h],swipeIdx:h})]}),Object(r.jsxs)(s.a,{exact:!0,path:"/game/:gameId/overview/",children:[Object(r.jsx)(wn,{}),Object(r.jsx)(se,{swipes:u.filter((function(n){return void 0!==n.vote}))})]}),Object(r.jsx)(s.a,{exact:!0,path:"/game/:gameId/details/:cardId",children:Object(r.jsx)(Xe,{cards:u})}),Object(r.jsx)(s.a,{path:"/game",children:Object(r.jsx)(rt,{apology:"Sorry, this page doesn't exist :("})})]})},ct=t(70),ot=t.n(ct);function at(){var n=Object(x.a)(["\n   font-size: 30px;\n   margin: 10px;\n"]);return at=function(){return n},n}function ut(){var n=Object(x.a)(["\n   background-color: ",";\n   border-color: ",";\n"]);return ut=function(){return n},n}function st(){var n=Object(x.a)(["\n   disabled: ",";\n"]);return st=function(){return n},n}function lt(){var n=Object(x.a)(["\n   display: flex;\n   flex-flow: row nowrap;\n   align-items: center;\n   justify-content: center;\n   @media (max-width: 410px) {\n      flex-flow: column;\n      justify-content: space-around;\n      align-items: space-around;\n   }\n"]);return lt=function(){return n},n}function dt(){var n=Object(x.a)(["\n   flex-basis: 2;\n   flex-grow: 2;\n   display: flex;\n   flex-flow: column;\n   align-items: center;\n   justify-content: flex-start;\n"]);return dt=function(){return n},n}function bt(){var n=Object(x.a)(["\n   font-size: max(1.2vw, 12px);\n   text-align: center;\n"]);return bt=function(){return n},n}function ft(){var n=Object(x.a)(["\n   font-size: max(10vw, 60px);\n   text-align: center;\n"]);return ft=function(){return n},n}function jt(){var n=Object(x.a)(["\n   flex-basis: 1;\n   flex-grow: 1;\n   display: flex;\n   flex-flow: column;\n   align-items: center;\n   justify-content: center;\n   width: calc(80% - 20px);\n"]);return jt=function(){return n},n}function pt(){var n=Object(x.a)(["\n   display: flex;\n   flex-flow: column;\n   align-items: center;\n   justify-content: space-around;\n   width: calc(100% - 20px);\n   height: calc(100% - 20px);\n"]);return pt=function(){return n},n}var xt=Object(h.b)(I)(pt()),ht=h.b.div(jt()),vt=h.b.h1(ft()),Ot=h.b.h6(bt()),gt=h.b.div(dt()),mt=h.b.div(lt()),wt=Object(h.b)(C)(st(),(function(n){return n.disabled})),yt=Object(h.b)(C)(ut(),y,y),kt=h.b.h2(at()),Ct=function(){var n=Object(i.useState)(""),e=Object(l.a)(n,2),t=e[0],c=e[1],o=Object(i.useState)(!1),a=Object(l.a)(o,2),d=a[0],b=a[1],p=Object(s.f)(),x=function(n){n.length<=5&&c(n)},h=Object(i.useCallback)((function(){f.a.post(j.server.url+j.server.newGame).then((function(n){200===n.status&&(x(n.data.id),setTimeout((function(){p.push("/lobby/"+n.data.id)}),250))})).catch((function(n){console.log(n)}))}),[p]);return Object(i.useEffect)((function(){5===t.length&&f.a.get(j.server.url+"game/",{params:{id:t}}).then((function(n){200===n.status?b(!0):b(!1)})).catch((function(){b(!1)}))}),[t]),Object(r.jsxs)(xt,{children:[Object(r.jsxs)(ht,{children:[Object(r.jsx)(vt,{children:"What-To-Watch"}),Object(r.jsx)(Ot,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "})]}),Object(r.jsxs)(gt,{children:[Object(r.jsx)(yt,{onClick:h,children:"NEW GAME"}),Object(r.jsx)(kt,{children:"OR"}),Object(r.jsxs)(mt,{children:[Object(r.jsx)(ot.a,{type:"text",fields:5,name:"joinCode",inputMode:"full-width-latin",onChange:x,value:t||"     "}),Object(r.jsx)(u.b,{to:"/lobby/"+t,children:Object(r.jsx)(wt,{disabled:!d,children:"JOIN"})})]})]})]})},St=function(){return Object(r.jsx)(u.a,{children:Object(r.jsxs)(s.c,{children:[Object(r.jsx)(s.a,{exact:!0,path:"/lobby/:lobbyId",children:Object(r.jsx)(hn,{})}),Object(r.jsx)(s.a,{path:"/game/:gameId",children:Object(r.jsx)(it,{})}),Object(r.jsx)(s.a,{exact:!0,path:"/",children:Object(r.jsx)(Ct,{})}),Object(r.jsx)(s.a,{path:"/",children:Object(r.jsx)(rt,{apology:"Sorry, this game or page doesn't exist :("})})]})})};function It(){return Object(r.jsx)(St,{})}t(132);a.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(It,{})}),document.getElementById("root"))},33:function(n){n.exports=JSON.parse('{"movie":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}],"tv":[{"id":10759,"name":"Action & Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":10762,"name":"Kids"},{"id":9648,"name":"Mystery"},{"id":10763,"name":"News"},{"id":10764,"name":"Reality"},{"id":10765,"name":"Sci-Fi & Fantasy"},{"id":10766,"name":"Soap"},{"id":10767,"name":"Talk"},{"id":10768,"name":"War & Politics"},{"id":37,"name":"Western"}]}')},5:function(n){n.exports=JSON.parse('{"movieDb":{"posterUrl":"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/","bgUrl":"https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/","profileUrl":"https://www.themoviedb.org/t/p/w138_and_h175_face"},"server":{"url":"/","newGame":"game/","details":"details/"}}')}},[[133,1,2]]]);
//# sourceMappingURL=main.f2881cfc.chunk.js.map