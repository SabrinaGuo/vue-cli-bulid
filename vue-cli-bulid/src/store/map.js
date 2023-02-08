import { ref, watch, onMounted } from "vue";
import store from "./../store";
import L from "leaflet";

const ICON = {
  iconUrl:
    "https//raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/markder-icon-2x-violet.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images.marker-shadow.png",
  iconSize: [24, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
};
const map = ref({});
const markers = [];

const addMarker = (item) => {
  //將標記放置到地圖上
  const marker = L.marker([item.longitude, item.latitude], ICON)
    .addTo(map.value)
    .bindPopup(`<h2 class="popup-name">${item.name}</h2>`);

  //替 marker 加入 id 與經緯度資訊
  marker.markerId = item.id;
  marker.lng = item.longitude;
  marker.lat = item.latitude;

  //將 marker push 到陣列裡
  markers.push(marker);
};
const clearMarkers = () => {
  //清除地圖上所有標記
  map.value.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.value.removeLayer(layer);
    }
  });

  // 清空陣列
  markers.length = 0;
};
const triggerPopup = (markerId) => {
  //找出目標標記
  const marker = markers.find((d) => d.markerId === markerId);

  //將地圖中心指向目標標記，並開啟彈窗
  map.value.flyTo(new L.LatLng(marker.lng, marker.lat), 15);
  marker.openPopup(); //利用事件傳遞來觸發跨元件的 methods
};

const mapInit = () => {
  //onMounted hook
  onMounted(() => {
    map.value = L.map("mask-map", {
      center: [25.03, 121.55],
      zoom: 14,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '<a target="_blank" href="https://www.openstreetmap.org/">OpenStreetMAp 貢獻者 </a>',
      maxZoom: 18,
    }).addTo(map.value);
  });

  // 原本的 watch
  watch(
    () => store.state.currDistrictInfo,
    (dist) => {
      map.value.panTo(new L.LatLng(dist.latitude, dist.longitude));
    }
  );
  watch(
    () => store.state.filteredStores,
    (stores) => {
      clearMarkers();
      stores.forEach((ele) => addMarker(ele));
    }
  );
};
export default {
  triggerPopup,
  mapInit,
};
