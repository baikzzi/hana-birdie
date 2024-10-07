package com.kopo.hanabirdie.domain.finance.controller;

import com.google.cloud.documentai.v1.Document;
import com.google.cloud.documentai.v1.DocumentProcessorServiceClient;
import com.google.cloud.documentai.v1.ProcessRequest;
import com.google.cloud.documentai.v1.ProcessResponse;
import com.google.cloud.documentai.v1.RawDocument;
import com.google.protobuf.ByteString;
//import com.kopo.hanagolf.domain.finance.dto.*;
import com.kopo.hanabirdie.domain.finance.dto.*;
import com.kopo.hanabirdie.domain.finance.service.FinanceService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Tag(name = "Finance")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/finance")
public class FinanceController {
    private final FinanceService financeService;

    @PostMapping("/ocr")
    public ResponseEntity<Object> processDocument(@RequestParam("file") MultipartFile file) throws IOException {
        String projectId = "braided-turbine-432501-h6"; // 실제 프로젝트 ID로 교체
        String location = "us"; // 실제 location으로 교체
        String processorId = "e99385a7d76ff0e3"; // 실제 프로세서 ID로 교체

        String name = String.format("projects/%s/locations/%s/processors/%s", projectId, location, processorId);

        try (DocumentProcessorServiceClient client = DocumentProcessorServiceClient.create()) {
            byte[] fileContent = file.getBytes();
            RawDocument rawDocument = RawDocument.newBuilder()
                    .setContent(ByteString.copyFrom(fileContent))
                    .setMimeType(file.getContentType())
                    .build();

            ProcessRequest request = ProcessRequest.newBuilder()
                    .setName(name)
                    .setRawDocument(rawDocument)
                    .build();

            // Document AI API 호출
            ProcessResponse result = client.processDocument(request);
            Document document = result.getDocument();

            // 문서 텍스트와 페이지 수 출력
//            System.out.println("문서 텍스트: " + document.getText());
//            System.out.println("페이지 수: " + document.getPagesCount());

            // 테이블 데이터 추출 및 병합
            Map<String, Object> mergedTableData = extractAndMergeTablesFromDocument(document);
//            System.out.println("병합된 테이블 데이터: " + mergedTableData);

            if (mergedTableData.isEmpty()) {
                return ResponseEntity.status(500).body("테이블 데이터가 없습니다.");
            }

            return ResponseEntity.ok(mergedTableData);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("문서 처리 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    private Map<String, Object> extractAndMergeTablesFromDocument(Document document) {
        Map<String, Object> mergedTableData = new HashMap<>();
        List<String> headers = new ArrayList<>();
        List<List<String>> mergedRows = new ArrayList<>();
        boolean headerSet = false;

        for (Document.Page page : document.getPagesList()) {
            for (Document.Page.Table table : page.getTablesList()) {

                // 첫 번째 테이블의 헤더만 headers에 추가
                if (!headerSet && !table.getHeaderRowsList().isEmpty()) {
                    Document.Page.Table.TableRow headerRow = table.getHeaderRowsList().get(0);
                    for (Document.Page.Table.TableCell cell : headerRow.getCellsList()) {
                        String headerText = cleanText(getText(cell.getLayout().getTextAnchor(), document.getText()));
                        if (!headerText.isEmpty()) {
                            headers.add(headerText);
                        }
                    }
                    headerSet = true; // 첫 번째 헤더가 설정되었음을 표시
                    mergedTableData.put("headers", headers); // 첫 번째 헤더만 headers에 추가
                } else if (!table.getHeaderRowsList().isEmpty()) {
                    // 두 번째 이후 테이블의 헤더를 rows에 추가
                    List<String> headerAsRow = new ArrayList<>();
                    Document.Page.Table.TableRow headerRow = table.getHeaderRowsList().get(0);
                    for (Document.Page.Table.TableCell cell : headerRow.getCellsList()) {
                        String headerText = cleanText(getText(cell.getLayout().getTextAnchor(), document.getText()));
                        headerAsRow.add(headerText);
                    }
                    mergedRows.add(headerAsRow); // 두 번째 이후 헤더를 rows에 추가
                }

                // 모든 테이블의 바디 행 추가 (헤더와 무관하게 행 추가)
                for (Document.Page.Table.TableRow bodyRow : table.getBodyRowsList()) {
                    List<String> rowCells = new ArrayList<>();
                    for (Document.Page.Table.TableCell cell : bodyRow.getCellsList()) {
                        String cellText = cleanText(getText(cell.getLayout().getTextAnchor(), document.getText()));
                        rowCells.add(cellText); // 모든 셀 추가
                    }
                    mergedRows.add(rowCells);
                }
            }
        }

        mergedTableData.put("rows", mergedRows); // 병합된 행 추가
        return mergedTableData;
    }

    private String cleanText(String text) {
        return text.replace("\n", ""); // \n을 ""로 치환
    }

    private String getText(Document.TextAnchor textAnchor, String fullText) {
        if (textAnchor.getTextSegmentsCount() > 0) {
            Document.TextAnchor.TextSegment textSegment = textAnchor.getTextSegments(0);
            int startIndex = (int) textSegment.getStartIndex();
            int endIndex = (int) textSegment.getEndIndex();
            return fullText.substring(startIndex, endIndex);
        }
        return "";
    }

    @PostMapping("/upload")
    public ResponseEntity<Void> uploadFinanceStatement(@RequestBody List<UploadFinanceStatementRequest> dto) {
        financeService.uploadFinanceStatement(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/load")
    public ResponseEntity<List<LoadFinanceStatementResponse>> loadFinanceStatement(@RequestBody LoadFinanceStatementRequest dto) {
        return ResponseEntity.ok(financeService.loadFinanceStatement(dto));
    }

    @PostMapping("/analysis")
    public ResponseEntity<FinanceAnalysisResponse> financeAnalysis(@RequestBody FinanceAnalysisRequest dto) {
        return ResponseEntity.ok(financeService.financeAnalysis(dto));
    }

}

