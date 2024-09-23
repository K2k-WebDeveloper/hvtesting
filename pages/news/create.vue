<script setup lang="ts">
import type {ApiResponse, PaginatedApiResponse} from "~/types";
import {endpoints} from "~/helpers/endpoints";
import {pitLib} from "~/helpers/pitLib";
import UiPanel from "~/components/parts/ui-panel.vue";

definePageMeta({
  layout:"default",
  middleware:"ensure-login",
})
const loadingCreateResp=ref<Boolean>(false)
const createResp=ref<ApiResponse>()
const field_logo=ref(null)
const logo_preview=ref(null)
const formData=reactive({
  title:"",tags:'',content:null,logo:null,category:null
})
const {data:categResp,loading:loadingCategResponse,refresh:refetch} =useFetch<PaginatedApiResponse>(endpoints.blog.category.index,{
  method:"post",
  body:{
    status:"active"
  },
  headers:pitLib.util.headers(),
  query:{pagination:500}
})
function submit() {
  loadingCreateResp.value=true
  var tags=formData.tags?JSON.parse(formData.tags).map(o=>o.value):null
  let fd=new FormData()
  fd.append("title",formData.title)
  if (tags){
    tags.forEach((item) => fd.append("tags", item))
  }
  fd.append("content",formData.content)
  fd.append("logo",field_logo.value?.files[0])
  fd.append("category",formData.category)
  $fetch(endpoints.blog.create,{
    method:"post",
    headers:pitLib.util.headers(),
    body:fd
  }).then((d:PaginatedApiResponse)=>{
    loadingCreateResp.value=false
    createResp.value=d
  })
}
async function handleLogo() {
  logo_preview.value=await pitLib.media.getBase64(field_logo.value?.files[0])
}
onMounted(()=>{
  new Tagify(document.querySelector('#tags'))
})
</script>

<template>
  <!-- main content -->
  <div class="main-content right-chat-active">

    <div class="middle-sidebar-bottom">
      <div class="middle-sidebar-left">
        <!-- loader wrapper -->
        <!-- loader wrapper -->
        <div class="row feed-body">
          <div class="col-xl-8 col-xxl-9 col-lg-8">
            <div class="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
              <div class="card-body p-0">
                <h5>Create New Blog</h5>
              </div>
              <div class="row mt-3">
                <div class="col-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                  <div class="form-group">
                    <label class="mont-font fw-600 font-xsss">Title</label>
                    <input v-model="formData.title" type="text" class="form-control">
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                  <div class="form-group" v-if="!loadingCategResponse">
                    <label class="mont-font fw-600 font-xsss">Category</label>
                    <select v-model="formData.category" class="form-control">
                      <option :value="c?._id" v-for="c in categResp?.data?.data">{{c?.title}}</option>
                    </select>
                  </div>
                </div>

                <div class="col-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                  <div class="form-group" >
                    <div class="form-group" v-if="!loadingCategResponse">
                      <label class="mont-font fw-600 font-xsss">Tags</label>
                      <input @change="formData.tags=$event.target?.tagifyValue" id="tags" type="text" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="col-12 mb-2">
                  <div class="form-group" >
                    <div class="form-group" v-if="!loadingCategResponse">
                      <label class="mont-font fw-600 font-xsss">Tags</label>
                      <client-only>
                        <editor v-model="formData.content"></editor>
                      </client-only>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                  <div class="form-group mb-0 w-100">
                    <input ref="field_logo" @change="handleLogo()" type="file" name="file" id="file" class="input-file">
                    <label for="file" class="rounded-3 text-center bg-white btn-tertiary js-labelFile p-4 w-100 border-dashed">
                      <i v-if="!logo_preview" class="ti-cloud-down large-icon me-3 d-block"></i>
                      <span v-if="!logo_preview" class="js-fileName">Choose Logo or Drop Here</span>
                      <img v-if="logo_preview" :src="logo_preview" class="img-thumbnail">
                    </label>
                  </div>
                </div>
              </div>
              <ui-panel class="mt-3" ref="divResp" :type="createResp?.status===true?'success':'warning'" :content="createResp?.message" @show="createResp=$event" v-if="createResp"></ui-panel>
              <div class="row mt-3">
                <div class="col text-right">
                  <q-btn @click="submit" class="" :loading="loadingCreateResp" :disable="loadingCreateResp" color="primary"  label="Post" ></q-btn>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
            <div class="card w-100 shadow-xss rounded-xxl border-0 mb-3">
              <div class="card-body d-flex align-items-center p-4">
                <h4 class="fw-700 mb-0 font-xssss text-grey-900">Friend Request</h4>
                <a href="default-member.html" class="fw-600 ms-auto font-xssss text-primary">See all</a>
              </div>
              <div class="card-body d-flex pt-4 ps-4 pe-4 pb-0 border-top-xs bor-0">
                <figure class="avatar me-3"><img src="/tpl1/images/user-7.png" alt="image" class="shadow-sm rounded-circle w45"></figure>
                <h4 class="fw-700 text-grey-900 font-xssss mt-1">Anthony Daugloi <span class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">12 mutual friends</span></h4>
              </div>
              <div class="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                <a href="#" class="p-2 lh-20 w100 bg-primary-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl">Confirm</a>
                <a href="#" class="p-2 lh-20 w100 bg-grey text-grey-800 text-center font-xssss fw-600 ls-1 rounded-xl">Delete</a>
              </div>

              <div class="card-body d-flex pt-0 ps-4 pe-4 pb-0">
                <figure class="avatar me-3"><img src="/tpl1/images/user-8.png" alt="image" class="shadow-sm rounded-circle w45"></figure>
                <h4 class="fw-700 text-grey-900 font-xssss mt-1">Mohannad Zitoun <span class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">12 mutual friends</span></h4>
              </div>
              <div class="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                <a href="#" class="p-2 lh-20 w100 bg-primary-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl">Confirm</a>
                <a href="#" class="p-2 lh-20 w100 bg-grey text-grey-800 text-center font-xssss fw-600 ls-1 rounded-xl">Delete</a>
              </div>

              <div class="card-body d-flex pt-0 ps-4 pe-4 pb-0">
                <figure class="avatar me-3"><img src="/tpl1/images/user-12.png" alt="image" class="shadow-sm rounded-circle w45"></figure>
                <h4 class="fw-700 text-grey-900 font-xssss mt-1">Mohannad Zitoun <span class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">12 mutual friends</span></h4>
              </div>
              <div class="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                <a href="#" class="p-2 lh-20 w100 bg-primary-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl">Confirm</a>
                <a href="#" class="p-2 lh-20 w100 bg-grey text-grey-800 text-center font-xssss fw-600 ls-1 rounded-xl">Delete</a>
              </div>
            </div>

            <div class="card w-100 shadow-xss rounded-xxl border-0 p-0 ">
              <div class="card-body d-flex align-items-center p-4 mb-0">
                <h4 class="fw-700 mb-0 font-xssss text-grey-900">Confirm Friend</h4>
                <a href="default-member.html" class="fw-600 ms-auto font-xssss text-primary">See all</a>
              </div>
              <div class="card-body bg-transparent-card d-flex p-3 bg-greylight ms-3 me-3 rounded-3">
                <figure class="avatar me-2 mb-0"><img src="/tpl1/images/user-7.png" alt="image" class="shadow-sm rounded-circle w45"></figure>
                <h4 class="fw-700 text-grey-900 font-xssss mt-2">Anthony Daugloi <span class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">12 mutual friends</span></h4>
                <a href="#" class="btn-round-sm bg-white text-grey-900 feather-chevron-right font-xss ms-auto mt-2"></a>
              </div>
              <div class="card-body bg-transparent-card d-flex p-3 bg-greylight m-3 rounded-3" style="margin-bottom: 0 !important;">
                <figure class="avatar me-2 mb-0"><img src="/tpl1/images/user-8.png" alt="image" class="shadow-sm rounded-circle w45"></figure>
                <h4 class="fw-700 text-grey-900 font-xssss mt-2"> David Agfree  <span class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">12 mutual friends</span></h4>
                <a href="#" class="btn-round-sm bg-white text-grey-900 feather-plus font-xss ms-auto mt-2"></a>
              </div>
              <div class="card-body bg-transparent-card d-flex p-3 bg-greylight m-3 rounded-3">
                <figure class="avatar me-2 mb-0"><img src="/tpl1/images/user-12.png" alt="image" class="shadow-sm rounded-circle w45"></figure>
                <h4 class="fw-700 text-grey-900 font-xssss mt-2">Hugury Daugloi <span class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">12 mutual friends</span></h4>
                <a href="#" class="btn-round-sm bg-white text-grey-900 feather-plus font-xss ms-auto mt-2"></a>
              </div>

            </div>

            <div class="card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3">
              <div class="card-body d-flex align-items-center p-4">
                <h4 class="fw-700 mb-0 font-xssss text-grey-900">Suggest Group</h4>
                <a href="default-group.html" class="fw-600 ms-auto font-xssss text-primary">See all</a>
              </div>
              <div class="card-body d-flex pt-4 ps-4 pe-4 pb-0 overflow-hidden border-top-xs bor-0">
                <img src="/tpl1/images/e-2.jpg" alt="img" class="img-fluid rounded-xxl mb-2">
              </div>
              <div class="card-body dd-block pt-0 ps-4 pe-4 pb-4">
                <ul class="memberlist mt-1 mb-2 ms-0 d-block">
                  <li class="w20"><a href="#"><img src="/tpl1/images/user-6.png" alt="user" class="w35 d-inline-block" style="opacity: 1;"></a></li>
                  <li class="w20"><a href="#"><img src="/tpl1/images/user-7.png" alt="user" class="w35 d-inline-block" style="opacity: 1;"></a></li>
                  <li class="w20"><a href="#"><img src="/tpl1/images/user-8.png" alt="user" class="w35 d-inline-block" style="opacity: 1;"></a></li>
                  <li class="w20"><a href="#"><img src="/tpl1/images/user-3.png" alt="user" class="w35 d-inline-block" style="opacity: 1;"></a></li>
                  <li class="last-member"><a href="#" class="bg-greylight fw-600 text-grey-500 font-xssss w35 ls-3 text-center" style="height: 35px; line-height: 35px;">+2</a></li>
                  <li class="ps-3 w-auto ms-1"><a href="#" class="fw-600 text-grey-500 font-xssss">Member apply</a></li>
                </ul>
              </div>



            </div>

            <div class="card w-100 shadow-xss rounded-xxl border-0 mb-3">
              <div class="card-body d-flex align-items-center p-4">
                <h4 class="fw-700 mb-0 font-xssss text-grey-900">Suggest Pages</h4>
                <a href="default-group.html" class="fw-600 ms-auto font-xssss text-primary">See all</a>
              </div>
              <div class="card-body d-flex pt-4 ps-4 pe-4 pb-0 overflow-hidden border-top-xs bor-0">
                <img src="/tpl1/images/g-2.jpg" alt="img" class="img-fluid rounded-xxl mb-2">
              </div>
              <div class="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                <a href="#" class="p-2 lh-28 w-100 bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"><i class="feather-external-link font-xss me-2"></i> Like Page</a>
              </div>

              <div class="card-body d-flex pt-0 ps-4 pe-4 pb-0 overflow-hidden">
                <img src="/tpl1/images/g-3.jpg" alt="img" class="img-fluid rounded-xxl mb-2 bg-lightblue">
              </div>
              <div class="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                <a href="#" class="p-2 lh-28 w-100 bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"><i class="feather-external-link font-xss me-2"></i> Like Page</a>
              </div>


            </div>

            <div class="card w-100 shadow-xss rounded-xxl border-0 mb-3">
              <div class="card-body d-flex align-items-center  p-4">
                <h4 class="fw-700 mb-0 font-xssss text-grey-900">Event</h4>
                <a href="default-event.html" class="fw-600 ms-auto font-xssss text-primary">See all</a>
              </div>
              <div class="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                <div class="bg-success me-2 p-3 rounded-xxl"><h4 class="fw-700 font-lg ls-3 lh-1 text-white mb-0"><span class="ls-1 d-block font-xsss text-white fw-600">FEB</span>22</h4></div>
                <h4 class="fw-700 text-grey-900 font-xssss mt-2">Meeting with clients <span class="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">41 madison ave, floor 24 new work, NY 10010</span> </h4>
              </div>

              <div class="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                <div class="bg-warning me-2 p-3 rounded-xxl"><h4 class="fw-700 font-lg ls-3 lh-1 text-white mb-0"><span class="ls-1 d-block font-xsss text-white fw-600">APR</span>30</h4></div>
                <h4 class="fw-700 text-grey-900 font-xssss mt-2">Developer Programe <span class="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">41 madison ave, floor 24 new work, NY 10010</span> </h4>
              </div>

              <div class="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                <div class="bg-primary me-2 p-3 rounded-xxl"><h4 class="fw-700 font-lg ls-3 lh-1 text-white mb-0"><span class="ls-1 d-block font-xsss text-white fw-600">APR</span>23</h4></div>
                <h4 class="fw-700 text-grey-900 font-xssss mt-2">Aniversary Event <span class="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">41 madison ave, floor 24 new work, NY 10010</span> </h4>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
  <!-- main content -->
</template>

<style scoped>

</style>
