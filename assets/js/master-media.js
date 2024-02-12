"use strict";

(function () {
  $("#table-media").DataTable({
    data: [
      {
        mediaId: "1",
        namaMedia: "Kabarkinisite.com",
        kategori: "Siber",
      },
      {
        mediaId: "2",
        namaMedia: "Jurnalminang.id",
        kategori: "Siber",
      },
      {
        mediaId: "3",
        namaMedia: "Haluan",
        kategori: "Cetak",
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
        text: `<i class="ti ti-plus me-md-1"></i><span class="d-md-inline-block d-none">Tambah Media</span>`,
        className: "btn btn-primary",
        attr: {
          "data-bs-toggle": "offcanvas",
          "data-bs-target": "#offcanvas-add-media",
          id: "btn-add-media",
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
        data: "mediaId",
        name: "mediaId",
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
        data: "kategori",
        name: "kategori",
        responsivePriority: 4,
      },
      {
        data: "mediaId",
        name: "mediaId",
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
        orderable: false,
      },
    ],
    initComplete: function () {
      $(".dataTables_filter .form-control").removeClass("form-control-sm");
      $(".dataTables_length .form-select").removeClass("form-select-sm");

      $("#table-media").DataTable().columns.adjust();
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
