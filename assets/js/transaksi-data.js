"use strict";

(function () {
  $("#table-input-data").DataTable({
    data: [
      {
        dataId: "1",
        namaMedia: "Kabarkinisite.com",
        kategoriMedia: "Siber",
        jenisBerita: "Hoax",
        linkBerita: "https://kabarkinisite.com/",
        tanggalTerbit: "01-01-2024",
      },
      {
        dataId: "2",
        namaMedia: "Jurnalminang.id",
        kategoriMedia: "Siber",
        jenisBerita: "Kerjasama",
        linkBerita: "https://jurnalminang.id/",
        tanggalTerbit: "01-23-2024",
      },
      {
        dataId: "3",
        namaMedia: "Haluan",
        kategoriMedia: "Cetak",
        jenisBerita: "Control",
        linkBerita: "https://www.harianhaluan.com/",
        tanggalTerbit: "02-04-2024",
      },
    ],
    filter: true,
    responsive: true,
    autoWidth: true,
    lengthMenu: [10, 25, 50, 100],
    responsive: { details: false },
    language: {
      emptyTable: "Tidak ada data yang tersedia pada tabel ini",
      info: "Menampilkan _START_ - _END_ dari _TOTAL_ entri",
      infoEmpty: "Menampilkan 0 - 0 dari 0 entri",
      infoFiltered: "(disaring dari _MAX_ entri keseluruhan)",
      lengthMenu: "Tampilkan _MENU_",
      loadingRecords: "Sedang memuat...",
      processing: "Sedang memproses...",
      search: "Cari:",
      zeroRecords: "Tidak ditemukan data yang sesuai",
      thousands: "'",
      paginate: {
        first: "Pertama",
        last: "Terakhir",
        next: ">",
        previous: "<",
      },
    },
    buttons: [
      {
        text: `<i class="ti ti-plus me-md-1"></i><span class="d-md-inline-block d-none">Tambah Data</span>`,
        className: "btn btn-primary",
        attr: {
          "data-bs-toggle": "offcanvas",
          "data-bs-target": "#offcanvas-add-data",
          id: "btn-add-data",
        },
      },
    ],
    dom: `
            <"row ms-2 me-3"
                <"col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start gap-2"l<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start mt-md-0 mt-3"B>>
                <"col-12 col-md-6 d-flex align-items-center justify-content-end flex-column flex-md-row pe-3 gap-md-2"f>
            >t
            <"row mx-2"
                <"col-sm-12 col-md-6"i>
                <"col-sm-12 col-md-6"p>
            >`,
    columns: [
      {
        data: "dataId",
        name: "dataId",
        responsivePriority: 2,
        render: function (data, type, row, meta) {
          return meta.settings._iDisplayStart + meta.row + 1;
        },
      },
      {
        data: "namaMedia",
        name: "namaMedia",
        responsivePriority: 3,
      },
      {
        data: "kategoriMedia",
        name: "kategoriMedia",
        responsivePriority: 4,
      },
      {
        data: "jenisBerita",
        name: "jenisBerita",
        responsivePriority: 5,
      },
      {
        data: "linkBerita",
        name: "linkBerita",
        className: "text-center",
        responsivePriority: 6,
        render: function (data, type, row, meta) {
          return type === "display"
            ? `<a href="${data}" target="_blank" rel="tooltip" class="text-body" data-bs-placement="top" title="Kunjungi Berita">
                    <i class="ti ti-link mx-2 ti-sm"></i>
                </a>`
            : data;
        },
      },
      {
        data: "tanggalTerbit",
        name: "tanggalTerbit",
        className: "text-nowrap",
        responsivePriority: 7,
        render: function (data, type, row, meta) {
          return new Date(data).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
        },
      },
      {
        data: "dataId",
        name: "dataId",
        className: "text-center",
        responsivePriority: 1,
        render: function (data, type, row, meta) {
          return type === "display"
            ? `<div class="d-flex align-items-center justify-content-center">
                                <a href="javascript:void(0);" data-id="${data}" id="btn-edit-media" rel="tooltip" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-edit-media" class="text-body" data-bs-placement="top" title="Edit Data">
                                    <i class="ti ti-edit mx-2 ti-sm"></i>
                                </a>
                                <a href="javascript:;" data-id="${data}" id="btn-delete-media" rel="tooltip" class="text-body" data-bs-placement="top" title="Hapus Data">
                                    <i class="ti ti-trash mx-2 ti-sm"></i>
                                </a>
                            </div>`
            : data;
        },
      },
    ],
    columnDefs: [
      {
        targets: 0,
        orderable: false,
        searchable: false,
      },
      {
        targets: 1,
        orderable: true,
      },
      {
        targets: 2,
        orderable: true,
      },
      {
        targets: 3,
        orderable: true,
      },
      {
        targets: 4,
        orderable: false,
      },
      {
        targets: 5,
        orderable: true,
      },
      {
        targets: 6,
        orderable: false,
      },
    ],
    initComplete: function () {
      $(".dataTables_filter .form-control").removeClass("form-control-sm");
      $(".dataTables_length .form-select").removeClass("form-select-sm");

      $("#table-input-data").DataTable().columns.adjust();
    },
    drawCallback: function () {
      var tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[rel="tooltip"]')
      );
      var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });

      tooltipList.forEach((tooltip) => {
        $(".tooltip").hide();
      });
    },
  });
})();
