"use strict";

(function () {
  $("#table-user").DataTable({
    data: [
      {
        userId: "1",
        nama: "Administrator",
        nomorHandphone: "0813 7833 5837",
        jenisAkun: "Admin",
        statusAktif: true,
      },
      {
        userId: "2",
        nama: "Users",
        nomorHandphone: "0853 6331 1232",
        jenisAkun: "Users",
        statusAktif: false,
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
              columns: [1, 2, 3, 4],
              body: function (data, rowIndex, columnIndex, node) {
                if ($(data).is("span")) {
                  var spanContent = $(data).text().trim(); // Mengambil isi dalamnya dan menghilangkan spasi pada awal dan akhir value
                  return spanContent;
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
              columns: [1, 2, 3, 4],
              format: {
                body: function (data, rowIndex, columnIndex, node) {
                  if ($(data).is("span")) {
                    var spanContent = $(data).text().trim(); // Mengambil isi dalamnya dan menghilangkan spasi pada awal dan akhir value
                    return spanContent;
                  }
                  return data;
                },
              },
            },
          },
        ],
      },
      {
        text: `<i class="ti ti-plus me-md-1"></i><span class="d-md-inline-block d-none"></span>`,
        className: "btn btn-primary",
        attr: {
          "data-bs-toggle": "offcanvas",
          "data-bs-target": "#offcanvas-add-user",
          id: "btn-add-user",
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
        data: "userId",
        name: "userId",
        responsivePriority: 1,
        render: function (data, type, row, meta) {
          return meta.settings._iDisplayStart + meta.row + 1;
        },
      },
      {
        data: "nama",
        name: "nama",
        responsivePriority: 2,
      },
      {
        data: "nomorHandphone",
        name: "nomorHandphone",
        responsivePriority: 3,
      },
      {
        data: "jenisAkun",
        name: "jenisAkun",
        responsivePriority: 4,
      },
      {
        data: "statusAktif",
        name: "statusAktif",
        className: "text-nowrap",
        responsivePriority: 5,
        render: function (data, type, row, meta) {
          return type === "display"
            ? `<span class="badge ${
                data === true ? "bg-label-success" : "bg-label-danger"
              } text-capitalized">
                        ${data === true ? "Aktif" : "Non-Aktif"}
                    </span>`
            : data;
        },
      },
      {
        data: "userId",
        name: "userId",
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
        orderable: true,
      },
      {
        targets: 5,
        orderable: false,
      },
    ],
    initComplete: function () {
      $(".dataTables_filter .form-control").removeClass("form-control-sm");
      $(".dataTables_length .form-select").removeClass("form-select-sm");

      $("#table-user").DataTable().columns.adjust();
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
