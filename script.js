const tombol = document.getElementById("tombol");
const pesan = document.getElementById("pesan");

tombol.addEventListener("click", function() {
    pesan.textContent = "Le bouton a été cliqué !";
    tombol.textContent = "Merci pour le clic !";
});

function calculate() {
    let pinjaman = Number(document.getElementById("pinjaman").value);
    let periode = Number(document.getElementById("periode").value);
    let persentase = Number(document.getElementById("persentase").value);

    // Validasi input
    if (
        !Number.isFinite(pinjaman) ||
        !Number.isFinite(periode) ||
        !Number.isFinite(persentase) ||
        pinjaman <= 0 ||
        periode <= 0 ||
        persentase < 0  
    ) {
        alert("Silakan masukkan nilai yang valid!");
        return;
    }

    // Konversi persentase ke desimal
    const r = persentase / 100 / 12;

    const table= document.getElementById("tabel_hasil");
    table.innerHTML = ""; // Kosongkan tabel sebelumnya

    const rupiah = value =>
        "Rp " + value.toLocaleString("id-ID", {
             minimumFractionDigits: 2, 
             maximumFractionDigits: 2 
        });

    const anuitas = (pinjaman * r) / (1 - Math.pow(1 + r, -periode)); // Kalkulasi Anuitas
    let sisa_pinjaman = pinjaman; // Inisialisasi sisa pinjaman

    //Bulan 0
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${0}</td>
        <td>${"-"}</td>
        <td>${"-"}</td>
        <td>${"-"}</td>
        <td>${rupiah(sisa_pinjaman)}</td>
    `;
    document.getElementById("tabel_hasil").appendChild(row);

    // Kalkulasi Bunga, Angsuran Pokok, dan Sisa Pinjaman untuk setiap periode
    for (let i = 1; i <= periode; i++) {
        let bunga = sisa_pinjaman * r;
        let angsuran_pokok = anuitas - bunga;
        sisa_pinjaman = sisa_pinjaman - angsuran_pokok;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${i}</td>
            <td>${rupiah(angsuran_pokok)}</td>
            <td>${rupiah(bunga)}</td>
            <td>${rupiah(anuitas)}</td>
            <td>${rupiah(sisa_pinjaman)}</td>
        `;
        document.getElementById("tabel_hasil").appendChild(row);
    }
}