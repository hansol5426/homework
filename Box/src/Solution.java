class Solution {
    public int solution(int n, int w, int num) {
        // 택배 박스 쌓기
         
        // 박스의 높이
        int h = (n%w == 0 ? n/w :  n/w+1);
        // 박스 2차원 배열 선언
        int[][] box = new int[h][w];
        // 박스번호 지정할 count
        int count = 1;
        // 박스의 높이만큼 반복
        for(int i = h-1; i >= 0; i--){
            // 높이가 짝수일 때
            if(i%2==0){
                // 왼쪽에서 오른쪽으로 증가
                for(int j=0; j<w; j++){
                    // n을 넘으면 반복문 빠져나가기
                    if(count > n) break;
                    box[i][j]=count;
                    count++;
                }
            // 높이가 홀수일 때    
            }else{
                // 오른쪽에서 왼쪽으로 증가
                for(int j=w-1; j>=0; j--){
                    // n을 넘으면 반복문 빠져나가기
                    if(count > n) break;
                    box[i][j]=count;
                    count++;
                    
                }
            }
        }         
      
        // 박스 순회
        int answer = 0;
        box:
        for(int i =0; i<box.length; i++) {
        	for(int j=0; j<box[i].length; j++) {
                // num 박스 찾기
        		if(box[i][j] == num) {
                    // num 위에 박스 개수 세기
                    for(int k = 0; k<=i; k++){
                        // 값이 0이 아닐 경우에만 +
                        if(box[k][j]!=0){
                           answer++; 
                        }
                    }
                    // 찾았으면 반복문 빠져나가기
                    break box;
        		}
        	}
        }
        
        return answer;
    }
}