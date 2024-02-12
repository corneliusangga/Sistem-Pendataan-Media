"use strict";

(function () {
  $("#datepicker-filter").datepicker({
    todayHighlight: true,
    orientation: isRtl ? "auto right" : "auto left",
  });

  $("#table-laporan-transaksi").DataTable({
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
        extend: "collection",
        className: "btn btn-label-primary dropdown-toggle me-2",
        text: '<i class="ti ti-file-export me-sm-1"></i> <span class="d-none d-sm-inline-block">Export</span>',
        buttons: [
          {
            extend: "print",
            text: '<i class="ti ti-printer me-1" ></i>Cetak',
            className: "dropdown-item",
            exportOptions: {
              columns: [1, 2, 3, 4, 5],
              body: function (data, rowIndex, columnIndex, node) {
                if (typeof data === "string" && data.includes("<a")) {
                  return $(data).attr("href");
                }
                return data;
              },
            },
            customize: function (win) {
              $(win.document.body)
                .css("color", config.colors.headingColor)
                .css("border-color", config.colors.borderColor)
                .css("background-color", config.colors.bodyBg);
              $(win.document.body)
                .find("table")
                .addClass("compact")
                .css("color", "inherit")
                .css("border-color", "inherit")
                .css("background-color", "inherit");
            },
          },
          {
            extend: "excel",
            text: '<i class="ti ti-file-spreadsheet me-1"></i>Excel',
            className: "dropdown-item",
            exportOptions: {
              columns: [1, 2, 3, 4, 5],
              format: {
                body: function (data, rowIndex, columnIndex, node) {
                  if (typeof data === "string" && data.includes("<a")) {
                    return $(data).attr("href");
                  }
                  return data;
                },
              },
            },
          },
        ],
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
        responsivePriority: 1,
        render: function (data, type, row, meta) {
          return meta.settings._iDisplayStart + meta.row + 1;
        },
      },
      {
        data: "namaMedia",
        name: "namaMedia",
        responsivePriority: 2,
      },
      {
        data: "kategoriMedia",
        name: "kategoriMedia",
        responsivePriority: 3,
      },
      {
        data: "jenisBerita",
        name: "jenisBerita",
        responsivePriority: 4,
      },
      {
        data: "linkBerita",
        name: "linkBerita",
        className: "text-center",
        responsivePriority: 5,
        render: function (data, type, row, meta) {
          return type === "display"
            ? `<a href="${data}" target="_blank" rel="tooltip" class="text-body" data-bs-placement="top" title="Kunjungi Berita">
                    ${data}
                </a>`
            : data;
        },
      },
      {
        data: "tanggalTerbit",
        name: "tanggalTerbit",
        className: "text-nowrap",
        responsivePriority: 6,
        render: function (data, type, row, meta) {
          return new Date(data).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
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
    ],
    initComplete: function () {
      $(".dataTables_filter .form-control").removeClass("form-control-sm");
      $(".dataTables_length .form-select").removeClass("form-select-sm");

      $("#table-laporan-transaksi").DataTable().columns.adjust();
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

  $("#table-rekap-laporan").DataTable({
    data: [
      {
        jenisBerita: "Hoax",
        total: "1",
      },
      {
        jenisBerita: "Kerjasama",
        total: "1",
      },
      {
        jenisBerita: "Control",
        total: "1",
      },
    ],
    filter: true,
    responsive: true,
    autoWidth: true,
    order: false,
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
        extend: "collection",
        className: "btn btn-label-primary dropdown-toggle me-2",
        text: '<i class="ti ti-file-export me-sm-1"></i> <span class="d-none d-sm-inline-block">Export</span>',
        buttons: [
          {
            extend: "print",
            text: '<i class="ti ti-printer me-1" ></i>Cetak',
            className: "dropdown-item",
            exportOptions: {
              columns: [0, 1],
              body: function (data, rowIndex, columnIndex, node) {
                return data;
              },
            },
            customize: function (win) {
              $(win.document.body)
                .css("color", config.colors.headingColor)
                .css("border-color", config.colors.borderColor)
                .css("background-color", config.colors.bodyBg);
              $(win.document.body)
                .find("table")
                .addClass("compact")
                .css("color", "inherit")
                .css("border-color", "inherit")
                .css("background-color", "inherit");
            },
          },
          {
            extend: "excel",
            text: '<i class="ti ti-file-spreadsheet me-1"></i>Excel',
            className: "dropdown-item",
            exportOptions: {
              columns: [0, 1],
              format: {
                body: function (data, rowIndex, columnIndex, node) {
                  return data;
                },
              },
            },
          },
        ],
      },
    ],
    dom: `
            <"row"
                <"col-sm-12 col-md-6"t>
            >`,
    columns: [
      {
        data: "jenisBerita",
        name: "jenisBerita",
        responsivePriority: 1,
      },
      {
        data: "total",
        name: "total",
        responsivePriority: 2,
      },
    ],
    columnDefs: [
      {
        targets: 0,
        orderable: true,
      },
      {
        targets: 1,
        orderable: true,
      },
    ],
    initComplete: function () {
      $(".dataTables_filter .form-control").removeClass("form-control-sm");
      $(".dataTables_length .form-select").removeClass("form-select-sm");

      $("#table-rekap-laporan").DataTable().columns.adjust();
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
