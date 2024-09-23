<script setup lang="ts">

import type {ApiResponse, PaginatedApiResponse} from "~/types";
import {endpoints} from "~/helpers/endpoints";
import {pitLib} from "~/helpers/pitLib";
import {Vue3Lottie} from "vue3-lottie";
import {env} from "~/helpers/env";
import {useSocket} from "~/composables/socket";

definePageMeta({
  layout:"default",
  middleware:"ensure-login"
})
const page=ref(1)
const route=useRoute()
const loadingUserChat=ref<true|false>(false)
const userChatResponse=ref<PaginatedApiResponse>()
const userChatPage=ref<Number>(1)
const endOfMessages=ref()
const loadingSendMessage=ref<true|false>(false)
const sendMessageResponse=ref<ApiResponse>()
const chatFormData=reactive({
  to:route.params._id,content:'',type:'g'
})
function getUserChat(){
  loadingUserChat.value=true
  $fetch<PaginatedApiResponse>(endpoints.chat.index,{
    method:"post",
    headers:pitLib.util.headers(),
    body:{
      to:route.params._id
    },
    query:{page:userChatPage.value,group:1}
  }).then((d)=>{
    userChatResponse.value=d
    loadingUserChat.value=false
    endOfMessages.value.scrollIntoView({ behavior: 'smooth' })
  })
}
function send(){
  if (!chatFormData.content){
    return
  }
  loadingSendMessage.value=true
  $fetch<ApiResponse>(endpoints.chat.create,{
    method:"post",
    headers:pitLib.util.headers(),
    body:chatFormData,
  }).then((d)=>{
    sendMessageResponse.value=d
    loadingSendMessage.value=false

    if (d.status){
      // userChatResponse.value?.data?.data.push(d?.data)
      endOfMessages.value.scrollIntoView({ behavior: 'smooth' })
      chatFormData.content=''
      console.log(userChatResponse.value?.data)
    }
  })
}
onMounted(()=>{
  getUserChat()
  if (pitLib.auth.is()){
    const socket =useSocket();
    socket.on('connect', () => {
      socket.on(env.SOCKET_MSG_RECEIVE+route.params._id, (msg:any) => {
        userChatResponse.value?.data?.data.push(JSON.parse(msg))
      });
    });
  }

})
</script>

<template>
  <!-- main content -->
  <div class="main-content right-chat-active">

    <div class="middle-sidebar-bottom">
      <div class="middle-sidebar-left pe-0 ps-lg-3 ms-0 me-0" style="max-width: 100%;">
        <div class="row">


          <div class="col-lg-12 position-relative">
            <div class="chat-wrapper pt-0 w-100 position-relative scroll-bar bg-white theme-dark-bg">
              <div class="chat-body p-3 ">
                <div class="messages-content pb-5">
                  <div v-for="m in userChatResponse?.data?.data">
                    <div v-if="m?.created_by?.[0]?._id!==pitLib.auth.get()?._id" class="message-item" >
                      <div class="message-user">
                        <figure class="avatar">
                          <img :src="m?.created_by?.[0]?.media.length?env.BASEPOINT+m?.created_by?.[0]?.media?.[0].path:env.NO_IMG_USER" alt="image">
                        </figure>
                        <div>
                          <h5>{{ m?.created_by?.[0]?.name }}</h5>
                          <div class="time">{{ pitLib.dt.fromNow(m?.created_at) }}</div>
                        </div>
                      </div>
                      <div class="message-wrap bg-primary-light">{{m?.content}}</div>
                    </div>

                    <div v-if="m?.created_by?.[0]?._id===pitLib.auth.get()?._id" class="message-item outgoing-message">
                      <div class="message-user">
                        <figure class="avatar">
                          <img :src="m?.created_by?.[0]?.media.length?env.BASEPOINT+m?.created_by?.[0]?.media?.[0].path:env.NO_IMG_USER" alt="image">
                        </figure>
                        <div>
                          <h5>{{ m?.created_by?.[0]?.name }}</h5>
                          <div class="time">{{pitLib.dt.fromNow(m?.created_at)}}
<!--                            <i class="ti-double-check text-info"></i>-->
                          </div>
                        </div>
                      </div>
                      <div class="message-wrap bg-primary-light">{{m?.content}}</div>
                    </div>
                  </div>


                  <div class="clearfix"></div>


                </div>
              </div>
            </div>
            <div class="card p-3 d-block border-0 d-block">
              <div class="form-group icon-right-input style1-input mb-0">
                <input v-on:keyup.enter="send()" v-model="chatFormData.content" type="text" placeholder="Start typing.." class="form-control rounded-xl bg-greylight border-0 font-xssss fw-500 ps-3">
                <i @click="send()" v-if="!loadingSendMessage" role="button" class="fa-regular fa-paper-plane text-grey-500 font-md"></i>
                <i v-if="loadingSendMessage" class="fa-solid fa-spinner fa-spin-pulse" role="status" aria-hidden="true"></i>
              </div>
            </div>
            <div ref="endOfMessages"></div>
          </div>

        </div>
      </div>

    </div>
  </div>
  <!-- main content -->
</template>

<style>
.outgoing-message{
  float: right;
}
</style>
