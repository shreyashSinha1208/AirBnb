const options = {
          method: 'GET',
          url: 'https://api.clashofclans.com/v1/players/%239glogp8cy',
          headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjMwZGFkNjhmLTgzNjItNGY5Ni0iOWFhLTZkZDE5NWIzOTUwMiIsImlhdCI6MTcxMzUxMjI4OCwic3ViIjoiZGV2ZWxvcGVyL2I0OWY2ZDc5LTQyYjMtY2FkZS04Y2Y1LWIwZmRlZGNlOGQyZSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE1Mi41OC4xNTUuMTY4Il0sInR5cGUiOiJjbGllbnQifV19.q_1XmMaWnzxKaepQEA-gRSBkY7GaRcuiOtDaGNxeKhSIUCyFW5LZqk5B82C6LfTaWSy3N6q2l10oYgc_2rOisQ'
          }
        };
        
        async function fetchData() {
          try {
            const response = await fetch(options.url, options);
            const data = await response.json(); // Parse the JSON response
            console.log(data);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();