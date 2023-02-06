<template>
  <div class="mask-map" id="mask-map"></div>
</template>
<script>
import L from "leaflet";
export default {
  name: "maskMap",
  data() {
    return {
      map: {},
      markers: [],
    };
  },
  computed: {
    currDistrictInfo() {
      return this.$store.getters.currDistrictInfo;
    },
    filiteredStores() {
      return this.$store.getters.filiteredStores;
    },
  },
  methods: {
    addMarker(item) {
      // 標記的圖示
      const ICON = {
        iconUrl:
          "https://www.clipartmax.com/png/middle/17-170231_location-icons-location-png.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      };

      // 將標記放置到地圖上
      const marker = L.marker([item.longitude, item.latitude], ICON)
        .addTo(this.map)
        .bindPopup(`<h2 class="popup-name">${item.name}</h2>`);

      // 替 marker 加入 id 與經緯度資訊
      marker.markerId = item.id;
      marker.lng = item.longitude;
      marker.lat = item.latitude;

      // 將 marker push 到陣列裡
      this.markers.push(marker);
    },
    clearMarkers() {
      // 清除地圖所有標記
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });

      // 清空陣列
      this.markers.length = 0;
    },
    triggerPopup(markerId) {
      // 找出目標標記
      const marker = this.markers.find((d) => d.markerId === markerId);
      //將地圖中心指向目標標記並開啟 Popup
      this.map.flyTo(new L.LatLng(marker.lng, marker.lat), 15);
      marker.openPopup(); // 點擊aside 跨元件觸發 triggerPopup -> 可運用事件傳遞骯是來觸發跨元件的 methods (這裡的彈窗是指點擊icon出現的彈窗)
    },
  },
  // 使用者切換監控並使用 leaflet 提供的 this.map.penTo來指定地圖中心點
  watch: {
    currDistrictInfo(dist) {
      // 切換行政區
      // 指定地圖中心點
      this.map.panTo(new L.LatLng(dist.latitude, dist.longitude));
    },
    filiteredStores(stores) {
      // 先清除原有 marker
      this.clearMarkers();
      // 根據藥局資訊加上對應 marker
      stores.forEach((element) => this.addMarker(element));
    },
  },
  mounted() {
    this.map = L.map("mask-map", {
      center: [25.03, 121.55],
      zoom: 14,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '<a target="_blank" href="https://www.openstreetmap.org/">© OpenStreetMap 貢獻者</a>',
      maxZoom: 18,
    }).addTo(this.map);
  },
};
</script>
